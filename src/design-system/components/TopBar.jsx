import './TopBar.css';

const STATUS_CLASS = {
  'not-started': 'topbar__status--not-started',
  'in-progress': 'topbar__status--in-progress',
  'shipped':     'topbar__status--shipped',
};

const STATUS_LABEL = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'shipped':     'Shipped',
};

export default function TopBar({
  brand = 'KodNest Premium Build System',
  currentStep = 1,
  totalSteps = 5,
  status = 'not-started',
}) {
  return (
    <header className="topbar">
      <span className="topbar__brand">{brand}</span>

      <span className="topbar__progress">
        Step {currentStep} / {totalSteps}
      </span>

      <span className={`topbar__status ${STATUS_CLASS[status] || ''}`}>
        {STATUS_LABEL[status] || status}
      </span>
    </header>
  );
}
