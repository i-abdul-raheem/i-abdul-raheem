import HeroSection from '../components/HeroSection';
import SectionList from '../components/SectionList';
import { usePortfolio } from '../hooks/usePortfolio';

function HomePage() {
  const { dict } = usePortfolio();
  const { home, posts, projects } = dict;

  return (
    <>
      <HeroSection />
      <SectionList
        title={home.sections.writing.title}
        items={posts}
        viewAllHref="/blog"
        viewAllLabel={home.sections.writing.viewAllLabel}
      />
      <SectionList
        title={home.sections.projects.title}
        items={projects}
        viewAllHref="/projects"
        viewAllLabel={home.sections.projects.viewAllLabel}
      />
    </>
  );
}

export default HomePage;
