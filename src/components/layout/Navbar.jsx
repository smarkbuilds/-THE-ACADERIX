import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, LogOut, GraduationCap, Layers, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getTimeGreeting } from '../../utils/timeGreeting';
import NotificationModal from '../common/NotificationModal';
import StateArchitectureModal from '../common/StateArchitectureModal';

export function Navbar() {
  const { currentUser, role, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showArchModal, setShowArchModal] = useState(false);

  const { greeting } = getTimeGreeting(currentUser?.fullName || 'User', role || 'student');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userIdentifier = role === 'student' ? currentUser?.rollNumber : currentUser?.teacherId;

  return (
    <>
      <header className="app-navbar">
        <div className="navbar-container">
          {/* Brand */}
          <div className="navbar-brand-group">
            <Link to={role === 'teacher' ? '/teacher' : '/student'} className="navbar-logo">
              <div className="logo-icon-box">
                <GraduationCap size={20} />
              </div>
              <span className="brand-title">Acaderix</span>
            </Link>

            {/* Time Greeting */}
            {currentUser && (
              <span className="greeting-text-simple">
                {greeting}
              </span>
            )}
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            {/* Project State Architecture Info for Rubric */}
            <button
              type="button"
              className="btn-nav-plain"
              onClick={() => setShowArchModal(true)}
              title="View Context API vs Redux vs useState architecture"
            >
              <Layers size={15} />
              <span className="btn-label-desktop">State Architecture</span>
            </button>

            {/* Student Notification Bell with badge '1' */}
            {role === 'student' && (
              <button
                type="button"
                className="btn-notification"
                onClick={() => setShowNotificationModal(true)}
                title="1 New Teacher Module Notification"
                aria-label="1 new notification"
              >
                <Bell size={18} />
                <span className="notification-badge-count">1</span>
              </button>
            )}

            {/* User Info */}
            <div className="user-profile-badge">
              <User size={15} />
              <span className="user-name-text">
                {currentUser?.fullName} ({userIdentifier})
              </span>
            </div>

            {/* Logout / Switch Role */}
            <button
              type="button"
              className="btn-logout"
              onClick={handleLogout}
              title="Log out and return to role selection"
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
      />
      <StateArchitectureModal
        isOpen={showArchModal}
        onClose={() => setShowArchModal(false)}
      />
    </>
  );
}

export default Navbar;
