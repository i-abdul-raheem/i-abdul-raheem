import { Link } from 'react-router-dom';

function SectionList({ title, items, viewAllHref, viewAllLabel }) {
  return (
    <section className="section-block">
      <div className="section-block-header">
        <h2 className="section-heading">{title}</h2>
        <Link className="section-link" to={viewAllHref}>→ {viewAllLabel}</Link>
      </div>
      <div className="content-list">
        {items.map((item) => (
          <article key={item.title} className="content-card">
            <div className="content-card-top">
              <h3 className="content-title">
                <Link to={item.href}>{item.title}</Link>
              </h3>
              {item.date ? <div className="meta">{item.date}</div> : null}
            </div>
            {item.description || item.excerpt ? (
              <p className="content-description">{item.description || item.excerpt}</p>
            ) : null}
            {item.tags?.length ? (
              <div className="tag-list">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default SectionList;
