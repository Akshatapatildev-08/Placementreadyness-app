import { useNavigate } from 'react-router-dom';
import './ContinuePractice.css';

export default function ContinuePractice({
  topic = 'Dynamic Programming',
  completed = 3,
  total = 10,
}) {
  const navigate = useNavigate();
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="continue-practice">
      <h3 className="continue-practice__heading">Continue Practice</h3>
      <p className="continue-practice__topic">{topic}</p>
      <div className="continue-practice__progress-row">
        <div className="continue-practice__bar">
          <div
            className="continue-practice__bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="continue-practice__count">
          {completed}/{total} completed
        </span>
      </div>
      <button
        className="continue-practice__btn"
        onClick={() => navigate('/practice')}
      >
        Continue
      </button>
    </div>
  );
}
