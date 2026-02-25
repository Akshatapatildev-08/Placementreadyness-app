import './Input.css';

export default function Input({
  label,
  hint,
  error,
  multiline = false,
  id,
  ...rest
}) {
  const fieldId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const Tag = multiline ? 'textarea' : 'input';

  return (
    <div className={`input-field${error ? ' input-field--error' : ''}`}>
      {label && (
        <label className="input-field__label" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <Tag
        id={fieldId}
        className={`input-field__control${multiline ? ' input-field__control--textarea' : ''}`}
        {...rest}
      />
      {(error || hint) && (
        <span className="input-field__hint">{error || hint}</span>
      )}
    </div>
  );
}
