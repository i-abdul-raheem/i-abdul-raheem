import { usePortfolio } from '../hooks/usePortfolio';

function AboutPage() {
  const { dict } = usePortfolio();
  const { about } = dict;

  return (
    <section className="page-shell about-page">
      <div className="about-hero">
        <div>
          <p className="about-eyebrow">{about.eyebrow}</p>
          <h1 className="page-title">{about.title}</h1>
          <p className="page-intro">{about.intro}</p>
        </div>
        <div className="about-highlights">
          {about.highlights.map((highlight) => (
            <div key={highlight.label} className="about-highlight-card">
              <span className="about-highlight-label">{highlight.label}</span>
              <strong>{highlight.text}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="about-body-card">
        <div className="about-body-copy">
          {about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="about-side-panel">
          <h2>{about.sidePanelTitle}</h2>
          <ul>
            {about.sidePanelItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
