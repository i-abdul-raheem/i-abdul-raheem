import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../language';
import { getDictionary } from '../locales';

function ProjectDetailPage() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const { projects, common } = dict;
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="page-shell">
        <Link className="section-link" to="/projects">{common.backToProjects}</Link>
        <p>{common.notFound}</p>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <Link className="section-link" to="/projects">← Back to project catalog</Link>
      <article className="page-card">
        <div className="meta">{project.year}</div>
        <h1 className="page-title">{project.title}</h1>
        <p className="page-intro">{project.description}</p>
        <div className="tag-list">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>
        <div className="page-body">
          {project.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </section>
  );
}

export default ProjectDetailPage;
