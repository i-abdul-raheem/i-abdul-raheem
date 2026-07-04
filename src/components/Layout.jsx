import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../language';
import { getDictionary } from '../locales';
import { initTheme, toggleTheme } from '../theme';

function Layout({ children }) {
  const [theme, setTheme] = useState('light');
  const { locale, toggleLocale } = useLanguage();
  const dict = getDictionary(locale);
  const navLabels = dict.common.nav;
  const themeLabels = dict.common.theme;

  useEffect(() => {
    const currentTheme = initTheme();
    setTheme(currentTheme);
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = toggleTheme();
    setTheme(nextTheme);
  };

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
              <span className="logo-bgs">bg's</span>
              <span className="logo-lab"> Lab</span>
            </Link>
          </div>
          <button className="hamburger" id="hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav">
            <span className="hamburger-icon" />
          </button>
          <ul className="nav-links">
            <li><Link to="/blog">{navLabels.blog}</Link></li>
            <li><Link to="/projects">{navLabels.projects}</Link></li>
            <li><Link to="/about">{navLabels.about}</Link></li>
            <li>
              <button className="theme-toggle" id="theme-toggle" title="Toggle Dark/Light Mode" onClick={toggleLocale}>
                {locale === 'de' ? 'EN' : 'DE'}
              </button>
            </li>
            <li>
              <button className="theme-toggle" id="theme-toggle" title="Toggle Dark/Light Mode" onClick={handleThemeToggle}>
                {theme === 'dark' ? themeLabels.light : themeLabels.dark}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div className="mobile-nav-overlay" id="mobile-nav-overlay" aria-hidden="true" />

      <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
        <div className="mobile-panel-header">
          <div className="site-title">
            <Link to="/">
              <span className="logo-bgs">bg's</span>
              <span className="logo-lab"> Lab</span>
            </Link>
          </div>
          <button className="mobile-panel-close" id="mobile-nav-close" aria-label="Close navigation menu">
            <span className="close-icon" />
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li><Link to="/blog">{navLabels.blog}</Link></li>
          <li><Link to="/projects">{navLabels.projects}</Link></li>
          <li><Link to="/about">{navLabels.about}</Link></li>
        </ul>
        <div className="mobile-nav-footer">
          <button className="theme-toggle" id="theme-toggle-mobile" title="Toggle Dark/Light Mode" onClick={toggleLocale}>
            {locale === 'de' ? 'EN' : 'DE'}
          </button>
          <button className="theme-toggle" id="theme-toggle-mobile" title="Toggle Dark/Light Mode" onClick={handleThemeToggle}>
            {theme === 'dark' ? themeLabels.light : themeLabels.dark}
          </button>
        </div>
      </nav>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="footer-section">
          <a href="mailto:burakgungor11235@gmail.com">burakgungor11235@gmail.com</a>
        </div>
        <div className="footer-section" style={{ textAlign: 'center' }}>
          <a href="https://github.com/burakgungor11235" target="_blank" rel="noopener">GITHUB</a>
          &nbsp;//&nbsp;
          <a href="https://www.linkedin.com/in/burak-güngör11235" target="_blank" rel="noopener">LINKEDIN</a>
        </div>
        <div className="footer-section" style={{ textAlign: 'right' }}>
          <span className="footer-geo">Burak Güngör</span> &bull; 2026
        </div>
      </footer>
    </div>
  );
}

export default Layout;
