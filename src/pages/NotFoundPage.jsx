import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function NotFoundPage() {
  const { currentUser, role } = useAuth();

  const homePath = currentUser
    ? role === 'teacher'
      ? '/teacher'
      : '/student'
    : '/';

  return (
    <div className="not-found-page-wrapper">
      <div className="not-found-box">
        <div className="not-found-icon-wrap">
          <FileQuestion size={56} className="text-primary" />
        </div>
        <span className="error-code-badge">404 Error</span>
        <h1 className="not-found-title">Academic Page Not Found</h1>
        <p className="not-found-desc">
          The requested URL does not match any registered curriculum route in the Acaderix application.
        </p>

        <div className="not-found-actions">
          <Link to={homePath} className="btn btn-primary btn-lg">
            <Home size={18} />
            <span>Return to {currentUser ? 'Dashboard' : 'Portal Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
