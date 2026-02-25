import './WeeklyGoals.css';

const DAYS = [
  { label: 'M', active: true },
  { label: 'T', active: true },
  { label: 'W', active: true },
  { label: 'T', active: false },
  { label: 'F', active: true },
  { label: 'S', active: false },
  { label: 'S', active: false },
];

export default function WeeklyGoals({ solved = 12, target = 20 }) {
  const percent = Math.round((solved / target) * 100);

  return (
    <div className="weekly-goals">
      <h3 className="weekly-goals__heading">Weekly Goals</h3>

      <p className="weekly-goals__stat">
        Problems Solved: <strong>{solved}/{target}</strong> this week
      </p>

      <div className="weekly-goals__bar">
        <div
          className="weekly-goals__bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="weekly-goals__days">
        {DAYS.map((day, i) => (
          <div key={i} className="weekly-goals__day">
            <div
              className={`weekly-goals__dot${day.active ? ' weekly-goals__dot--active' : ''}`}
            />
            <span className="weekly-goals__day-label">{day.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
