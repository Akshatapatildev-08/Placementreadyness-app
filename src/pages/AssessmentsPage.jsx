import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { runAnalysis } from '../lib/analyzer';
import './AssessmentsPage.css';

export default function AssessmentsPage() {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  function handleAnalyze(e) {
    e.preventDefault();
    setError('');
    setWarning('');

    if (!jdText.trim()) {
      setError('Please paste a job description to analyze.');
      return;
    }

    if (jdText.trim().length < 200) {
      setWarning('This JD is too short to analyze deeply. Paste full JD for better output.');
    }

    const result = runAnalysis({ company, role, jdText });
    // Navigate to results with the entry id
    navigate(`/resources?id=${result.id}`);
  }

  return (
    <div className="assessments-page">
      <h2 className="assessments-page__title">JD Analyzer</h2>
      <p className="assessments-page__subtitle">
        Paste a job description below. The system will extract skills, generate a preparation plan,
        round-wise checklist, likely interview questions, and a readiness score.
      </p>

      <form className="assessments-page__form" onSubmit={handleAnalyze}>
        <div className="assessments-page__row">
          <div className="assessments-page__field">
            <label htmlFor="company">Company Name</label>
            <input
              id="company"
              type="text"
              placeholder="e.g. Google, Infosys, TCS"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="assessments-page__field">
            <label htmlFor="role">Role / Position</label>
            <input
              id="role"
              type="text"
              placeholder="e.g. Software Engineer, Frontend Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>

        <div className="assessments-page__field">
          <label htmlFor="jd-text">Job Description</label>
          <textarea
            id="jd-text"
            rows={12}
            placeholder="Paste the full job description here..."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            required
          />
          <span className="assessments-page__char-count">{jdText.length} characters</span>
          {jdText.trim().length > 0 && jdText.trim().length < 200 && (
            <p className="assessments-page__warning">
              This JD is too short to analyze deeply. Paste full JD for better output.
            </p>
          )}
        </div>

        {error && <p className="assessments-page__error">{error}</p>}
        {warning && <p className="assessments-page__warning">{warning}</p>}

        <button type="submit" className="assessments-page__btn">
          Analyze
        </button>
      </form>
    </div>
  );
}
