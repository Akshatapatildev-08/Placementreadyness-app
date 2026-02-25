import { useState } from 'react';
import './ProofFooter.css';

const DEFAULT_ITEMS = [
  { id: 'ui',     label: 'UI Built' },
  { id: 'logic',  label: 'Logic Working' },
  { id: 'test',   label: 'Test Passed' },
  { id: 'deploy', label: 'Deployed' },
];

export default function ProofFooter({ items = DEFAULT_ITEMS, checkedIds, onToggle }) {
  const [internalChecked, setInternalChecked] = useState(new Set());

  const isControlled = checkedIds !== undefined;
  const checked = isControlled ? new Set(checkedIds) : internalChecked;

  function handleToggle(id) {
    if (isControlled) {
      onToggle?.(id);
    } else {
      setInternalChecked((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    }
  }

  return (
    <footer className="proof-footer">
      <h4 className="proof-footer__title">Proof Checklist</h4>
      <div className="proof-footer__list">
        {items.map((item) => {
          const isChecked = checked.has(item.id);
          return (
            <label key={item.id} className="proof-footer__item">
              <input
                type="checkbox"
                className="proof-footer__checkbox"
                checked={isChecked}
                onChange={() => handleToggle(item.id)}
              />
              <span className={`proof-footer__label${isChecked ? ' proof-footer__label--checked' : ''}`}>
                {item.label}
              </span>
            </label>
          );
        })}
      </div>
    </footer>
  );
}
