import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { clearAuthToken, getAuthToken, useContent } from '../context/ContentContext';
import {
  AboutEditor,
  CollectionEditor,
  HomeEditor,
  PagesEditor,
  SiteEditor
} from './editors';
import LinksEditor from './LinksEditor';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'pages', label: 'Pages' },
  { id: 'site', label: 'Site' },
  { id: 'links', label: 'Links' }
];

function AdminDashboard() {
  const { content, updateLocale, saveContent, saving, lastSaved, error, loading } = useContent();
  const [activeTab, setActiveTab] = useState('overview');
  const [locale, setLocale] = useState('en');
  const [saveMessage, setSaveMessage] = useState('');

  if (!getAuthToken()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSave = async () => {
    setSaveMessage('');
    try {
      await saveContent();
      setSaveMessage('Changes saved to MongoDB.');
    } catch (err) {
      setSaveMessage(err.message);
    }
  };

  const handleLogout = () => {
    clearAuthToken();
    window.location.href = '/admin';
  };

  const localeData = content[locale];

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Portfolio CMS</p>
          <h1>Dashboard</h1>
        </div>
        <div className="admin-header-actions">
          <div className="admin-locale-toggle">
            <button type="button" className={locale === 'en' ? 'active' : ''} onClick={() => setLocale('en')}>EN</button>
            <button type="button" className={locale === 'de' ? 'active' : ''} onClick={() => setLocale('de')}>DE</button>
          </div>
          <button type="button" className="admin-button primary" onClick={handleSave} disabled={saving || loading}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <Link className="admin-button ghost" to="/" target="_blank">View site</Link>
          <button type="button" className="admin-button ghost" onClick={handleLogout}>Log out</button>
        </div>
      </header>

      <div className="admin-layout">
        <nav className="admin-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <main className="admin-main">
          {error ? <p className="admin-error banner">{error}</p> : null}
          {saveMessage ? <p className="admin-success banner">{saveMessage}</p> : null}

          {activeTab === 'overview' ? (
            <div className="admin-panel">
              <h2>Overview</h2>
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <strong>{content.en.projects.length}</strong>
                  <span>Projects</span>
                </div>
                <div className="admin-stat-card">
                  <strong>{content.en.posts.length}</strong>
                  <span>Blog posts</span>
                </div>
                <div className="admin-stat-card">
                  <strong>{locale.toUpperCase()}</strong>
                  <span>Editing locale</span>
                </div>
              </div>
              <p className="admin-copy">
                Edit content in English and German, then save to persist changes in MongoDB.
              </p>
              {lastSaved ? (
                <p className="admin-meta">Last saved: {lastSaved.toLocaleString()}</p>
              ) : (
                <p className="admin-meta">No saves yet this session.</p>
              )}
              <p className="admin-meta">Default password: portfolio-admin (set ADMIN_PASSWORD env var to change)</p>
            </div>
          ) : null}

          {activeTab === 'home' ? (
            <HomeEditor locale={locale} data={localeData} onChange={(updater) => updateLocale(locale, updater)} />
          ) : null}

          {activeTab === 'about' ? (
            <AboutEditor locale={locale} data={localeData} onChange={(updater) => updateLocale(locale, updater)} />
          ) : null}

          {activeTab === 'projects' ? (
            <CollectionEditor locale={locale} type="projects" data={localeData} onChange={(updater) => updateLocale(locale, updater)} />
          ) : null}

          {activeTab === 'blog' ? (
            <CollectionEditor locale={locale} type="posts" data={localeData} onChange={(updater) => updateLocale(locale, updater)} />
          ) : null}

          {activeTab === 'pages' ? (
            <PagesEditor locale={locale} data={localeData} onChange={(updater) => updateLocale(locale, updater)} />
          ) : null}

          {activeTab === 'site' ? (
            <SiteEditor locale={locale} data={localeData} onChange={(updater) => updateLocale(locale, updater)} />
          ) : null}

          {activeTab === 'links' ? <LinksEditor /> : null}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
