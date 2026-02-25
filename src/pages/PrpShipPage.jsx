import { Link } from 'react-router-dom';
import { getChecklistStats, getTestChecklist } from '../lib/testChecklist';
import './PrpShipPage.css';

export default function PrpShipPage() {
  const checklist = getTestChecklist();
  const stats = getChecklistStats(checklist);

  if (!stats.allPassed) {
    return (
      <div className="prp-ship-page">
        <h2 className="prp-ship-page__title">Ship Readiness</h2>
        <div className="prp-ship-page__locked">
          <p className="prp-ship-page__status">Shipping is locked.</p>
          <p className="prp-ship-page__detail">
            Complete all checks on <Link to="/prp/07-test">/prp/07-test</Link> first.
          </p>
          <p className="prp-ship-page__detail">Tests Passed: {stats.passed} / {stats.total}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="prp-ship-page">
      <h2 className="prp-ship-page__title">Ship Readiness</h2>
      <div className="prp-ship-page__ready">
        <p className="prp-ship-page__status">All tests passed. Shipping unlocked.</p>
        <p className="prp-ship-page__detail">Tests Passed: {stats.passed} / {stats.total}</p>
      </div>
    </div>
  );
}
