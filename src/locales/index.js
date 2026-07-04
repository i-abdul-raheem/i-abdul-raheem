import en from './en.json';
import de from './de.json';

const dictionaries = { en, de };

export function getDictionary(locale = 'en') {
  return dictionaries[locale] ?? dictionaries.en;
}

export function getContent(locale = 'en') {
  const dictionary = getDictionary(locale);

  return {
    home: dictionary.home,
    blog: dictionary.blog,
    about: dictionary.about,
    projectsPage: dictionary.projectsPage,
    common: dictionary.common,
    posts: dictionary.posts,
    projects: dictionary.projects
  };
}
