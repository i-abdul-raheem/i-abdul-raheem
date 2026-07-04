import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ContentSync from './components/ContentSync';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import AdminApp from './admin/AdminApp';

function App() {
  return (
    <>
      <ContentSync />
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route
          path="/*"
          element={(
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Layout>
          )}
        />
      </Routes>
    </>
  );
}

export default App;
