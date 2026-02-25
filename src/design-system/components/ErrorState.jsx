import './ErrorState.css';

export default function ErrorState({ title = 'Something went wrong', message, fix }) {
  return (
    <div className="error-state" role="alert">
      <h3 className="error-state__title">{title}</h3>
      {message && <p className="error-state__message">{message}</p>}
      {fix && (
        <div className="error-state__fix">
          <span className="error-state__fix-label">How to resolve</span>
          {fix}
        </div>
      )}
    </div>
  );
}
