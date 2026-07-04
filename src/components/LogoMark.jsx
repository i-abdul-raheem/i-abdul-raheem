function LogoMark({ className = '', size = 32 }) {
  const height = Math.round(size * (1024 / 1536));

  return (
    <span
      className={`site-logo-mark ${className}`.trim()}
      style={{ width: size, height }}
      role="img"
      aria-label="Abdul Raheem"
    />
  );
}

export default LogoMark;
