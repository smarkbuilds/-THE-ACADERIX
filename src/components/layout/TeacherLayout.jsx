import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Layers, UserCheck } from 'lucide-react';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';
import { getTimeGreeting } from '../../utils/timeGreeting';

export function TeacherLayout() {
  const { currentUser } = useAuth();
  const { greeting, message } = getTimeGreeting(currentUser?.fullName, 'teacher');

  return (
    <div className="layout-shell">
      <Navbar />

      {/* Clean Greeting Header */}
      <div className="dashboard-greeting-simple teacher-theme">
        <div className="greeting-text-wrap">
          <h2>{greeting}!</h2>
          <p>{message}</p>
        </div>
        <div className="greeting-meta-wrap">
          <span className="meta-tag">Faculty ID: <strong>{currentUser?.teacherId}</strong></span>
          <span className="meta-tag">Institute: <strong>{currentUser?.instituteName}</strong></span>
        </div>
      </div>

      {/* Main Grid: Sidebar + Content */}
      <div className="layout-main-grid">
        <aside className="layout-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-title">Faculty Menu</span>
          </div>

          <nav className="sidebar-nav">
            <NavLink
              to="/teacher"
              end
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/teacher/modules"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Layers size={17} />
              <span>Course Modules</span>
            </NavLink>

            <NavLink
              to="/teacher/profile"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <UserCheck size={17} />
              <span>Faculty Profile</span>
            </NavLink>
          </nav>

          <div className="sidebar-footer-box">
            <span className="box-sub">Institute</span>
            <p className="box-main">{currentUser?.instituteName}</p>
          </div>
        </aside>

        <main className="layout-content">
          <Outlet />
        </main>
      </div>

      <footer className="app-footer">
        <div className="footer-container">
          <p>Acaderix Academic Management System • Faculty Portal • CSE Project</p>
        </div>
      </footer>
    </div>
  );
}

export default TeacherLayout;
