import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

function AdminApp() {
  useEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.getAttribute('data-theme') || 'light';

    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';

    return () => {
      root.setAttribute('data-theme', previousTheme);
      root.style.colorScheme = previousTheme;
    };
  }, []);

  return (
    <div className="admin-root">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  );
}

export default AdminApp;
