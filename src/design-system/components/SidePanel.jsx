import Button from './Button';
import PromptBox from './PromptBox';
import './SidePanel.css';

export default function SidePanel({
  heading,
  description,
  promptCode,
  onBuild,
  onItWorked,
  onError,
  onScreenshot,
}) {
  return (
    <div className="side-panel">
      {heading && (
        <div className="side-panel__section">
          <h3 className="side-panel__heading">{heading}</h3>
          {description && <p className="side-panel__text">{description}</p>}
        </div>
      )}

      {promptCode && <PromptBox code={promptCode} />}

      <div className="side-panel__actions">
        {onBuild && (
          <Button variant="primary" onClick={onBuild}>Build in Lovable</Button>
        )}
        {onItWorked && (
          <Button variant="secondary" onClick={onItWorked}>It Worked</Button>
        )}
        {onError && (
          <Button variant="secondary" onClick={onError}>Error</Button>
        )}
        {onScreenshot && (
          <Button variant="ghost" onClick={onScreenshot}>Add Screenshot</Button>
        )}
      </div>
    </div>
  );
}
