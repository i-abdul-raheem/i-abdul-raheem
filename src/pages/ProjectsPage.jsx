import { Link } from 'react-router-dom';
import { useLanguage } from '../language';
import { getDictionary } from '../locales';

function ProjectsPage() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const { projectsPage: projectsContent, projects } = dict;

  return (
    <section className="page-shell project-catalog">
      <div className="project-hero">
        <div>
          <p className="about-eyebrow">{projectsContent.eyebrow}</p>
          <h1 className="page-title">{projectsContent.title}</h1>
          <p className="page-intro">{projectsContent.intro}</p>
        </div>
        <div className="project-spotlight">
          <span className="about-highlight-label">{projectsContent.spotlightLabel}</span>
          <strong>{projectsContent.spotlightText}</strong>
        </div>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <div className="project-meta">{project.year}</div>
            <h3 className="project-title">
              <Link to={project.href}>{project.title}</Link>
            </h3>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>
            <p className="project-description">{project.description}</p>
            <Link className="project-link" to={project.href}>{projectsContent.projectLink}</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsPage;
