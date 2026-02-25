import './ContextHeader.css';

export default function ContextHeader({ title, subtitle }) {
  return (
    <section className="context-header">
      <h1 className="context-header__title">{title}</h1>
      {subtitle && <p className="context-header__subtitle">{subtitle}</p>}
    </section>
  );
}
