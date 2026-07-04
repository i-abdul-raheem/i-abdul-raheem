import { Link, useParams } from 'react-router-dom';
import { usePortfolio } from '../hooks/usePortfolio';

function BlogPostPage() {
  const { dict } = usePortfolio();
  const { posts, common } = dict;
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <section className="page-shell">
        <p>{common.notFound}</p>
        <Link className="section-link" to="/blog">{common.backToBlog}</Link>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <Link className="section-link" to="/blog">← Back to blog</Link>
      <article className="page-card">
        <p className="meta">{post.date}</p>
        <h1 className="page-title">{post.title}</h1>
        <p className="page-intro">{post.excerpt}</p>
        <div className="tag-list">
          {post.tags.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>
        <div className="page-body">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </section>
  );
}

export default BlogPostPage;
