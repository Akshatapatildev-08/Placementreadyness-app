import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getChecklistStats,
  getTestChecklist,
  resetTestChecklist,
  TEST_ITEMS,
  updateTestChecklistItem,
} from '../lib/testChecklist';
import './PrpTestPage.css';

export default function PrpTestPage() {
  const [checklist, setChecklist] = useState(() => getTestChecklist());
  const stats = useMemo(() => getChecklistStats(checklist), [checklist]);

  function handleToggle(id, checked) {
    setChecklist(updateTestChecklistItem(id, checked));
  }

  function handleReset() {
    setChecklist(resetTestChecklist());
  }

  return (
    <div className="prp-test-page">
      <h2 className="prp-test-page__title">Release Test Checklist</h2>
      <p className="prp-test-page__summary">Tests Passed: {stats.passed} / {stats.total}</p>
      {!stats.allPassed && (
        <p className="prp-test-page__warning">Fix issues before shipping.</p>
      )}
      {stats.allPassed && (
        <p className="prp-test-page__success">
          All checks are complete. You can proceed to <Link to="/prp/08-ship">/prp/08-ship</Link>.
        </p>
      )}

      <section className="prp-test-page__section">
        {TEST_ITEMS.map((item) => (
          <label key={item.id} className="prp-test-page__item">
            <div className="prp-test-page__item-main">
              <input
                type="checkbox"
                checked={checklist[item.id] === true}
                onChange={(e) => handleToggle(item.id, e.target.checked)}
              />
              <span>{item.label}</span>
            </div>
            {item.hint && <p className="prp-test-page__hint">How to test: {item.hint}</p>}
          </label>
        ))}
      </section>

      <div className="prp-test-page__actions">
        <button type="button" onClick={handleReset} className="prp-test-page__reset-btn">
          Reset checklist
        </button>
        <Link className="prp-test-page__ship-link" to="/prp/08-ship">
          Go to Ship Page
        </Link>
      </div>
    </div>
  );
}
