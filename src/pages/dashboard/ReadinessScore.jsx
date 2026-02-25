import './ReadinessScore.css';

export default function ReadinessScore({ score = 72, total = 100 }) {
  const radius = 80;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / total) * circumference;
  const offset = circumference - progress;

  return (
    <div className="readiness">
      <h3 className="readiness__heading">Overall Readiness</h3>
      <div className="readiness__ring">
        <svg
          width={200}
          height={200}
          viewBox="0 0 200 200"
          className="readiness__svg"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={stroke}
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="readiness__progress"
          />
        </svg>
        <div className="readiness__label">
          <span className="readiness__number">{score}</span>
          <span className="readiness__text">Readiness Score</span>
        </div>
      </div>
    </div>
  );
}
