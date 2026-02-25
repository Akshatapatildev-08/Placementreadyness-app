import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import './SkillBreakdown.css';

const SKILL_DATA = [
  { skill: 'DSA',            value: 75 },
  { skill: 'System Design',  value: 60 },
  { skill: 'Communication',  value: 80 },
  { skill: 'Resume',         value: 85 },
  { skill: 'Aptitude',       value: 70 },
];

export default function SkillBreakdown() {
  return (
    <div className="skill-breakdown">
      <h3 className="skill-breakdown__heading">Skill Breakdown</h3>
      <div className="skill-breakdown__chart">
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={SKILL_DATA} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }}
              axisLine={false}
            />
            <Radar
              dataKey="value"
              stroke="hsl(245, 58%, 51%)"
              fill="hsl(245, 58%, 51%)"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
