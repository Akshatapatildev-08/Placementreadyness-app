import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3 } from 'lucide-react';
import './Landing.css';

const FEATURES = [
  {
    icon: Code,
    title: 'Practice Problems',
    description: 'Sharpen your skills with curated coding challenges across data structures, algorithms, and system design.',
  },
  {
    icon: Video,
    title: 'Mock Interviews',
    description: 'Simulate real interview scenarios with timed sessions and structured feedback to build confidence.',
  },
  {
    icon: BarChart3,
    title: 'Track Progress',
    description: 'Monitor your preparation with detailed analytics on strengths, weak areas, and overall readiness.',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* ── Hero ── */}
      <section className="landing__hero">
        <h1 className="landing__heading">Ace Your Placement</h1>
        <p className="landing__subheading">
          Practice, assess, and prepare for your dream job
        </p>
        <button
          className="landing__cta"
          onClick={() => navigate('/dashboard')}
        >
          Get Started
        </button>
      </section>

      {/* ── Features Grid ── */}
      <section className="landing__features">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-card__icon">
              <f.icon size={28} strokeWidth={1.5} />
            </div>
            <h3 className="feature-card__title">{f.title}</h3>
            <p className="feature-card__desc">{f.description}</p>
          </div>
        ))}
      </section>

      {/* ── Footer ── */}
      <footer className="landing__footer">
        <p>&copy; {new Date().getFullYear()} Placement Readiness. All rights reserved.</p>
      </footer>
    </div>
  );
}
