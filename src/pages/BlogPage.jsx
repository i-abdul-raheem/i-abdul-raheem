import { Link } from 'react-router-dom';
import { usePortfolio } from '../hooks/usePortfolio';

function BlogPage() {
  const { dict } = usePortfolio();
  const { blog, posts } = dict;

  return (
    <section className="page-shell blog-page">
      <div className="blog-hero">
        <div>
          <p className="about-eyebrow">{blog.eyebrow}</p>
          <h1 className="page-title">{blog.title}</h1>
          <p className="page-intro">{blog.intro}</p>
        </div>
        <div className="blog-callout">
          <span className="about-highlight-label">{blog.calloutLabel}</span>
          <strong>{blog.calloutText}</strong>
        </div>
      </div>

      <div className="content-list">
        {posts.map((post) => (
          <article key={post.slug} className="content-card blog-card">
            <div className="meta">{post.date}</div>
            <h3 className="content-title">
              <Link to={post.href}>{post.title}</Link>
            </h3>
            <p className="content-description">{post.excerpt}</p>
            <div className="tag-list">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BlogPage;
