import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../language';
import { usePortfolio } from '../hooks/usePortfolio';
import { initTheme, toggleTheme } from '../theme';
import SiteLogo from './SiteLogo';

function Layout({ children }) {
  const [theme, setTheme] = useState('light');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { locale, toggleLocale } = useLanguage();
  const { dict } = usePortfolio();
  const location = useLocation();
  const navLabels = dict.common.nav;
  const themeLabels = dict.common.theme;
  const site = dict.site ?? {};

  useEffect(() => {
    const currentTheme = initTheme();
    setTheme(currentTheme);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', mobileNavOpen);

    return () => {
      document.body.classList.remove('mobile-nav-open');
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = toggleTheme();
    setTheme(nextTheme);
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress-bar" id="progress-bar" />
      </div>

      <header className="site-header">
        <nav className="site-nav">
          <div className="site-title">
            <Link to="/">
              <SiteLogo size={30} />
            </Link>
          </div>
          <div className="site-nav-actions">
            <ul className="nav-links">
              <li><Link to="/blog">{navLabels.blog}</Link></li>
              <li><Link to="/projects">{navLabels.projects}</Link></li>
              <li><Link to="/about">{navLabels.about}</Link></li>
              <li>
                <button type="button" className="theme-toggle" title="Toggle language" onClick={toggleLocale}>
                  {locale === 'de' ? 'EN' : 'DE'}
                </button>
              </li>
              <li>
                <button type="button" className="theme-toggle" title="Toggle Dark/Light Mode" onClick={handleThemeToggle}>
                  {theme === 'dark' ? themeLabels.light : themeLabels.dark}
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="hamburger"
              aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              <span className="hamburger-icon" />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`mobile-nav-overlay${mobileNavOpen ? ' active' : ''}`}
        aria-hidden={!mobileNavOpen}
        onClick={closeMobileNav}
      />

      <nav
        className={`mobile-nav${mobileNavOpen ? ' active' : ''}`}
        id="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!mobileNavOpen}
      >
        <div className="mobile-panel-header">
          <div className="site-title">
            <Link to="/" onClick={closeMobileNav}>
              <SiteLogo size={30} />
            </Link>
          </div>
          <button
            type="button"
            className="mobile-panel-close"
            aria-label="Close navigation menu"
            onClick={closeMobileNav}
          >
            <span className="close-icon" />
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li><Link to="/blog" onClick={closeMobileNav}>{navLabels.blog}</Link></li>
          <li><Link to="/projects" onClick={closeMobileNav}>{navLabels.projects}</Link></li>
          <li><Link to="/about" onClick={closeMobileNav}>{navLabels.about}</Link></li>
        </ul>
        <div className="mobile-nav-footer">
          <button type="button" className="theme-toggle" title="Toggle language" onClick={toggleLocale}>
            {locale === 'de' ? 'EN' : 'DE'}
          </button>
          <button type="button" className="theme-toggle" title="Toggle Dark/Light Mode" onClick={handleThemeToggle}>
            {theme === 'dark' ? themeLabels.light : themeLabels.dark}
          </button>
        </div>
      </nav>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="footer-section">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div className="footer-section" style={{ textAlign: 'center' }}>
          <a href={site.github} target="_blank" rel="noopener">GITHUB</a>
        </div>
        <div className="footer-section" style={{ textAlign: 'right' }}>
          <span className="footer-geo">{site.name} &bull; {site.location}</span> &bull; 2026
        </div>
      </footer>
    </div>
  );
}

export default Layout;
