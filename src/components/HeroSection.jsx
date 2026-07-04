import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useLanguage } from '../language';
import { getDictionary } from '../locales';

function HeroSection() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const { home } = dict;
  const [prefix = home.title, suffix = ''] = home.title.split("'");

  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-main">
          <p className="about-eyebrow">{home.eyebrow}</p>
          <h1 className="hero-title">
            <span className="logo-bgs">{prefix + "'"}</span>
            <span className="logo-blog">{suffix}</span>
          </h1>
          <p className="hero-copy">{home.subtitle}</p>
          <div className="hero-actions">
            <Link className="hero-action primary" to="/projects">{home.cta.primary}</Link>
            <Link className="hero-action secondary" to="/blog">{home.cta.secondary}</Link>
          </div>
          <div className="quick-skills">
            {home.skills.map((skill, index) => (
              <Fragment key={skill}>
                <span>{skill}</span>
                {index < home.skills.length - 1 ? <span className="skill-separator">•</span> : null}
              </Fragment>
            ))}
          </div>
        </div>

        <aside className="hero-side-card">
          <p className="about-highlight-label">{home.spotlight.label}</p>
          <p className="hero-side-copy">{home.spotlight.description}</p>
          <ul className="hero-side-list">
            {home.spotlight.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

export default HeroSection;
