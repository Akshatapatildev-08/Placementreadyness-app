import './PageShell.css';

export default function PageShell({ children }) {
  return (
    <div className="page-shell">
      <div className="page-shell__body">{children}</div>
    </div>
  );
}
