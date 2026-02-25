import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getHistory, getEntryById } from '../lib/storage';
import './ResourcesPage.css';

export default function ResourcesPage() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('id');
  const [entry, setEntry] = useState(null);

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
          <ScoreCircle score={entry.readinessScore || 0} />
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
                  <span key={s} className="results-page__skill-tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
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
