import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, BookOpen, CheckSquare, Library, Flame } from 'lucide-react';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';
import { getTimeGreeting } from '../../utils/timeGreeting';
import { getStreakData } from '../../utils/streakTracker';

export function StudentLayout() {
  const { currentUser } = useAuth();
  const { greeting, message } = getTimeGreeting(currentUser?.fullName, 'student');
  const streak = getStreakData();

  return (
    <div className="layout-shell">
      <Navbar />

      {/* Clean Greeting Header */}
      <div className="dashboard-greeting-simple">
        <div className="greeting-text-wrap">
          <h2>{greeting}!</h2>
          <p>{message}</p>
        </div>
        <div className="greeting-meta-wrap">
          <span className="meta-tag">Roll No: <strong>{currentUser?.rollNumber}</strong></span>
          <span className="meta-tag">Year: <strong>{currentUser?.academicYear}</strong></span>
          <span className="meta-tag streak-tag">
            <Flame size={14} /> {streak.streakCount} Day Streak
          </span>
        </div>
      </div>

      {/* Main Grid: Sidebar + Content */}
      <div className="layout-main-grid">
        <aside className="layout-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-title">Student Menu</span>
          </div>

          <nav className="sidebar-nav">
            <NavLink
              to="/student"
              end
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/student/subjects"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <BookOpen size={17} />
              <span>My Subjects</span>
            </NavLink>

            <NavLink
              to="/student/revision"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <CheckSquare size={17} />
              <span>Revision Tasks</span>
            </NavLink>

            <NavLink
              to="/student/resources"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Library size={17} />
              <span>Resources</span>
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
          <p>Acaderix Academic Management System • CSE College Project</p>
        </div>
      </footer>
    </div>
  );
}

export default StudentLayout;
