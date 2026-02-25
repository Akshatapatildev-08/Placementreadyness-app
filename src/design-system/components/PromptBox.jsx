import { useState } from 'react';
import Button from './Button';
import './PromptBox.css';

export default function PromptBox({ label = 'Prompt', code }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="prompt-box">
      <div className="prompt-box__label">{label}</div>
      <div className="prompt-box__code">{code}</div>
      <div className="prompt-box__actions">
        <Button variant="secondary" size="sm" onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </div>
  );
}
