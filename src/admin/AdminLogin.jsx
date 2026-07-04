import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { clearAuthToken, getAuthToken, setAuthToken } from '../context/ContentContext';
import { apiUrl } from '../lib/api';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (getAuthToken()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!response.ok) throw new Error('Invalid password');

      const { token } = await response.json();
      setAuthToken(token);
      window.location.href = '/admin/dashboard';
    } catch {
      setError('Invalid password. Default is portfolio-admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell">
      <div className="admin-login-card">
        <p className="admin-eyebrow">Portfolio CMS</p>
        <h1>Admin Login</h1>
        <p className="admin-copy">Sign in to edit projects, blog posts, and site content.</p>
        <form onSubmit={handleSubmit} className="admin-form">
          <label className="admin-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter admin password"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="admin-error">{error}</p> : null}
          <button type="submit" className="admin-button primary" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <Link className="admin-link" to="/">← Back to portfolio</Link>
      </div>
    </div>
  );
}

export default AdminLogin;
