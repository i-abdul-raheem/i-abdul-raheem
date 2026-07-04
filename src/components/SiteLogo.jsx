import LogoMark from './LogoMark';

function SiteLogo({ size = 28, variant = 'default', showText = true }) {
  const isHero = variant === 'hero';

  return (
    <span className={`site-logo${isHero ? ' site-logo-hero' : ''}`}>
      <LogoMark className="site-logo-mark" size={size} />
      {showText ? (
        <span className="site-logo-text">
          <span className="logo-bgs">Abdul's</span>
          <span className="logo-lab"> Lab</span>
        </span>
      ) : null}
    </span>
  );
}

export default SiteLogo;
