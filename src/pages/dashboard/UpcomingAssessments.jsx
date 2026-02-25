import { ClipboardCheck } from 'lucide-react';
import './UpcomingAssessments.css';

const ASSESSMENTS = [
  { id: 1, title: 'DSA Mock Test',       time: 'Tomorrow, 10:00 AM' },
  { id: 2, title: 'System Design Review', time: 'Wed, 2:00 PM' },
  { id: 3, title: 'HR Interview Prep',    time: 'Friday, 11:00 AM' },
];

export default function UpcomingAssessments() {
  return (
    <div className="upcoming">
      <h3 className="upcoming__heading">Upcoming Assessments</h3>
      <ul className="upcoming__list">
        {ASSESSMENTS.map((a) => (
          <li key={a.id} className="upcoming__item">
            <div className="upcoming__icon">
              <ClipboardCheck size={16} strokeWidth={1.5} />
            </div>
            <div className="upcoming__info">
              <span className="upcoming__title">{a.title}</span>
              <span className="upcoming__time">{a.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
