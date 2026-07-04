import { useCallback, useEffect, useState } from 'react';
import { apiUrl } from '../lib/api';
import { getAuthToken } from '../context/ContentContext';

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthToken()}`
  };
}

function LinksEditor() {
  const [links, setLinks] = useState([]);
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [copiedSlug, setCopiedSlug] = useState('');

  const loadLinks = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(apiUrl('/api/links'), {
        headers: authHeaders()
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || 'Could not load links');
      }

      const data = await response.json();
      setLinks(data.links || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  const handleCreate = async (event) => {
    event.preventDefault();
    setCreating(true);
    setError('');

    try {
      const response = await fetch(apiUrl('/api/links'), {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ company })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || 'Could not create link');
      }

      setCompany('');
      await loadLinks();

      if (payload.link?.url) {
        await navigator.clipboard.writeText(payload.link.url);
        setCopiedSlug(payload.link.slug);
        setTimeout(() => setCopiedSlug(''), 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleCopy = async (url, slug) => {
    await navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(''), 2000);
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('Delete this tracking link?')) return;

    setError('');

    try {
      const response = await fetch(apiUrl('/api/links'), {
        method: 'DELETE',
        headers: authHeaders(),
        body: JSON.stringify({ slug })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || 'Could not delete link');
      }

      await loadLinks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Tracking links</h2>
      <p className="admin-copy">
        Generate short links to share with recruiters. When someone opens the link,
        you get an email and they land on your portfolio — no visible tracking in the URL.
      </p>

      <form className="admin-form" onSubmit={handleCreate}>
        <label className="admin-field">
          <span>Company or recipient</span>
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="e.g. Google, Acme GmbH"
            required
          />
          <small>Only you see this label — the link looks like /c/x7k2m9p</small>
        </label>
        <button type="submit" className="admin-button primary" disabled={creating || !company.trim()}>
          {creating ? 'Generating…' : 'Generate & copy link'}
        </button>
      </form>

      {error ? <p className="admin-error">{error}</p> : null}
      {copiedSlug ? <p className="admin-success">Link copied to clipboard.</p> : null}

      <div className="admin-subpanel" style={{ marginTop: '1rem' }}>
        <div className="admin-panel-header">
          <h3>Your links</h3>
          <button type="button" className="admin-button ghost" onClick={loadLinks} disabled={loading}>
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="admin-meta">Loading…</p>
        ) : links.length === 0 ? (
          <p className="admin-meta">No links yet. Create one above.</p>
        ) : (
          <div className="admin-links-table">
            {links.map((link) => (
              <div key={link.slug} className="admin-link-row">
                <div>
                  <strong>{link.company}</strong>
                  <code className="admin-link-url">{link.url}</code>
                  <p className="admin-meta">
                    {link.clicks} click{link.clicks === 1 ? '' : 's'}
                    {link.lastClickedAt
                      ? ` · Last opened ${new Date(link.lastClickedAt).toLocaleString()}`
                      : ' · Not opened yet'}
                  </p>
                </div>
                <div className="admin-link-actions">
                  <button
                    type="button"
                    className="admin-button ghost"
                    onClick={() => handleCopy(link.url, link.slug)}
                  >
                    {copiedSlug === link.slug ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    type="button"
                    className="admin-button danger"
                    onClick={() => handleDelete(link.slug)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LinksEditor;
