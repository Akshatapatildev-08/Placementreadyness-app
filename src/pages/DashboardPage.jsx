import ReadinessScore from './dashboard/ReadinessScore';
import SkillBreakdown from './dashboard/SkillBreakdown';
import ContinuePractice from './dashboard/ContinuePractice';
import WeeklyGoals from './dashboard/WeeklyGoals';
import UpcomingAssessments from './dashboard/UpcomingAssessments';
import './DashboardPage.css';

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <h2 className="dashboard__title">Dashboard</h2>

      <div className="dashboard__grid">
        {/* Row 1 */}
        <div className="dashboard__card">
          <ReadinessScore />
        </div>
        <div className="dashboard__card">
          <SkillBreakdown />
        </div>

        {/* Row 2 */}
        <div className="dashboard__card">
          <ContinuePractice />
        </div>
        <div className="dashboard__card">
          <WeeklyGoals />
        </div>

        {/* Row 3 — full width */}
        <div className="dashboard__card dashboard__card--full">
          <UpcomingAssessments />
        </div>
      </div>
    </div>
  );
}
