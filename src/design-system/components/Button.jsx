import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size,
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size && `btn--${size}`,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}
