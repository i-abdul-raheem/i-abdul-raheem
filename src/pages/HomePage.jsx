import HeroSection from '../components/HeroSection';
import SectionList from '../components/SectionList';
import { useLanguage } from '../language';
import { getDictionary } from '../locales';

function HomePage() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
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
