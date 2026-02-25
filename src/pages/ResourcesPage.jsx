import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getEntryById, getHistory, updateEntry } from '../lib/storage';
import './ResourcesPage.css';

export default function ResourcesPage() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('id');
  const [entry, setEntry] = useState(null);
  const [skillConfidenceMap, setSkillConfidenceMap] = useState({});

  useEffect(() => {
    const history = getHistory();
    if (history.length === 0) {
      setEntry(null);
      return;
    }

    if (idParam) {
      const selected = getEntryById(idParam);
      setEntry(selected || history[0]);
      return;
    }

    // Show the most recent entry
    setEntry(history[0]);
  }, [idParam]);

  const allSkills = useMemo(() => {
    if (!entry?.extractedSkills) return [];
    return Object.values(entry.extractedSkills).flat();
  }, [entry]);

  const baseReadinessScore = useMemo(() => {
    if (!entry) return 0;
    return entry.baseReadinessScore ?? entry.readinessScore ?? 0;
  }, [entry]);

  const liveReadinessScore = useMemo(() => {
    if (!entry) return 0;
    let score = baseReadinessScore;
    for (const skill of allSkills) {
      const confidence = skillConfidenceMap[skill] || 'practice';
      score += confidence === 'know' ? 2 : -2;
    }
    return Math.max(0, Math.min(100, score));
  }, [allSkills, baseReadinessScore, entry, skillConfidenceMap]);

  const weakSkills = useMemo(
    () => allSkills.filter((skill) => (skillConfidenceMap[skill] || 'practice') === 'practice').slice(0, 3),
    [allSkills, skillConfidenceMap],
  );

  useEffect(() => {
    if (!entry) return;
    const savedMap = entry.skillConfidenceMap || {};
    const normalized = {};
    for (const skill of allSkills) {
      normalized[skill] = savedMap[skill] === 'know' ? 'know' : 'practice';
    }
    setSkillConfidenceMap(normalized);
  }, [allSkills, entry]);

  function persistEntryChanges(nextMap, nextScore) {
    if (!entry?.id) return;
    const updated = updateEntry(entry.id, {
      baseReadinessScore,
      readinessScore: nextScore,
      skillConfidenceMap: nextMap,
    });
    if (updated) setEntry(updated);
  }

  function handleSkillConfidence(skill, value) {
    const nextMap = {
      ...skillConfidenceMap,
      [skill]: value,
    };

    let nextScore = baseReadinessScore;
    for (const s of allSkills) {
      const confidence = nextMap[s] || 'practice';
      nextScore += confidence === 'know' ? 2 : -2;
    }
    nextScore = Math.max(0, Math.min(100, nextScore));

    setSkillConfidenceMap(nextMap);
    persistEntryChanges(nextMap, nextScore);
  }

  async function copyText(label, text) {
    try {
      await navigator.clipboard.writeText(text);
      window.alert(`${label} copied to clipboard.`);
    } catch {
      window.alert(`Could not copy ${label}.`);
    }
  }

  function formatPlanText() {
    const lines = ['7-Day Preparation Plan'];
    for (const day of entry.plan || []) {
      lines.push('');
      lines.push(`${day.day}: ${day.title}`);
      for (const task of day.tasks || []) lines.push(`- ${task}`);
    }
    return lines.join('\n');
  }

  function formatChecklistText() {
    const lines = ['Round-wise Preparation Checklist'];
    for (const round of entry.checklist || []) {
      lines.push('');
      lines.push(round.round);
      for (const item of round.items || []) lines.push(`- ${item}`);
    }
    return lines.join('\n');
  }

  function formatQuestionsText() {
    const lines = ['10 Likely Interview Questions'];
    (entry.questions || []).forEach((q, idx) => lines.push(`${idx + 1}. ${q}`));
    return lines.join('\n');
  }

  function downloadAllAsTxt() {
    const skillsText = Object.entries(entry.extractedSkills || {})
      .map(([category, skills]) => `${category}: ${skills.join(', ')}`)
      .join('\n');
    const weakSkillsText = weakSkills.length > 0 ? weakSkills.join(', ') : 'None';

    const text = [
      'Placement Readiness Analysis',
      `Company: ${entry.company || 'N/A'}`,
      `Role: ${entry.role || 'N/A'}`,
      `Date: ${new Date(entry.createdAt).toLocaleString()}`,
      '',
      `Readiness Score: ${liveReadinessScore}/100`,
      '',
      'Key Skills Extracted',
      skillsText,
      '',
      formatChecklistText(),
      '',
      formatPlanText(),
      '',
      formatQuestionsText(),
      '',
      'Action Next',
      `Top weak skills: ${weakSkillsText}`,
      'Start Day 1 plan now.',
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `placement-readiness-${entry.id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (!entry) {
    return (
      <div className="results-page">
        <h2 className="results-page__title">Analysis Results</h2>
        <div className="results-page__empty">
          <p>No analysis found. Go to <strong>Assessments</strong> to analyze a job description.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <h2 className="results-page__title">Analysis Results</h2>

      {/* Meta row */}
      <div className="results-page__meta">
        {entry.company && <span className="results-page__tag results-page__tag--company">{entry.company}</span>}
        {entry.role && <span className="results-page__tag results-page__tag--role">{entry.role}</span>}
        <span className="results-page__tag results-page__tag--date">
          {new Date(entry.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Readiness Score */}
      <section className="results-page__section">
        <h3>Readiness Score</h3>
        <div className="results-page__score-ring">
          <ScoreCircle score={liveReadinessScore} />
        </div>
      </section>

      {/* Extracted Skills */}
      <section className="results-page__section">
        <h3>Key Skills Extracted</h3>
        <div className="results-page__skill-groups">
          {Object.entries(entry.extractedSkills || {}).map(([cat, skills]) => (
            <div key={cat} className="results-page__skill-group">
              <span className="results-page__cat-label">{cat}</span>
              <div className="results-page__tags">
                {skills.map((s) => (
                  <div key={s} className="results-page__skill-card">
                    <span className="results-page__skill-tag">{s}</span>
                    <div className="results-page__skill-toggle">
                      <button
                        type="button"
                        className={`results-page__toggle-btn${(skillConfidenceMap[s] || 'practice') === 'know' ? ' is-active' : ''}`}
                        onClick={() => handleSkillConfidence(s, 'know')}
                      >
                        I know this
                      </button>
                      <button
                        type="button"
                        className={`results-page__toggle-btn${(skillConfidenceMap[s] || 'practice') === 'practice' ? ' is-active' : ''}`}
                        onClick={() => handleSkillConfidence(s, 'practice')}
                      >
                        Need practice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Export Tools */}
      <section className="results-page__section">
        <h3>Export Tools</h3>
        <div className="results-page__export-actions">
          <button type="button" className="results-page__export-btn" onClick={() => copyText('7-day plan', formatPlanText())}>
            Copy 7-day plan
          </button>
          <button type="button" className="results-page__export-btn" onClick={() => copyText('round checklist', formatChecklistText())}>
            Copy round checklist
          </button>
          <button type="button" className="results-page__export-btn" onClick={() => copyText('10 questions', formatQuestionsText())}>
            Copy 10 questions
          </button>
          <button type="button" className="results-page__export-btn results-page__export-btn--primary" onClick={downloadAllAsTxt}>
            Download as TXT
          </button>
        </div>
      </section>

      {/* Round-wise Checklist */}
      <section className="results-page__section">
        <h3>Round-wise Preparation Checklist</h3>
        {(entry.checklist || []).map((round) => (
          <div key={round.round} className="results-page__round">
            <h4>{round.round}</h4>
            <ul>
              {round.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 7-Day Plan */}
      <section className="results-page__section">
        <h3>7-Day Preparation Plan</h3>
        <div className="results-page__plan-grid">
          {(entry.plan || []).map((day) => (
            <div key={day.day} className="results-page__plan-day">
              <div className="results-page__plan-header">
                <span className="results-page__plan-day-num">{day.day}</span>
                <span className="results-page__plan-day-title">{day.title}</span>
              </div>
              <ul>
                {day.tasks.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Interview Questions */}
      <section className="results-page__section">
        <h3>10 Likely Interview Questions</h3>
        <ol className="results-page__questions">
          {(entry.questions || []).map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      </section>

      {/* Action Next */}
      <section className="results-page__section results-page__action-next">
        <h3>Action Next</h3>
        <p className="results-page__action-text">
          Top 3 weak skills:{' '}
          <strong>
            {weakSkills.length > 0 ? weakSkills.join(', ') : 'No weak skills marked'}
          </strong>
        </p>
        <p className="results-page__action-cta">Start Day 1 plan now.</p>
      </section>
    </div>
  );
}

/* ── Score Circle (inline SVG) ── */
function ScoreCircle({ score }) {
  const r = 60;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="score-circle">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-border)" strokeWidth="8" />
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 600ms ease-in-out' }}
        />
      </svg>
      <div className="score-circle__label">
        <span className="score-circle__num">{score}</span>
        <span className="score-circle__text">/ 100</span>
      </div>
    </div>
  );
}
