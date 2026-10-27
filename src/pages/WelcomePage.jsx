import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, ArrowRight, CheckSquare, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function WelcomePage() {
  const navigate = useNavigate();
  const { loginProfile } = useAuth();

  const handleSelectRole = (role) => {
    navigate(`/register/${role}`);
  };

  // Quick helper to fill a demo profile for fast testing during evaluation
  const handleQuickDemo = (role) => {
    if (role === 'student') {
      loginProfile({
        role: 'student',
        fullName: 'Smark Singh',
        rollNumber: 'S-2024-CS101',
        academicYear: '3rd Year (Junior)',
        instituteName: 'National Institute of Technology',
        mobileNumber: '9876543210'
      });
      navigate('/student');
    } else {
      loginProfile({
        role: 'teacher',
        fullName: 'Prof. S. Sharma',
        teacherId: 'T-8842',
        instituteName: 'National Institute of Technology',
        mobileNumber: '9123456780'
      });
      navigate('/teacher');
    }
  };

  return (
    <div className="welcome-split-page">
      {/* Left Column: Academic Project Overview */}
      <div className="welcome-left-brand">
        <div className="brand-inner-content">
          <div className="welcome-logo-row">
            <div className="welcome-icon-box">
              <GraduationCap size={32} />
            </div>
            <div>
              <h1 className="welcome-brand-name">Acaderix</h1>
              <span className="brand-tagline-text">Academic Portal & Course Manager</span>
            </div>
          </div>

          <p className="welcome-tagline">
            A college web project built for Computer Science students and faculty to track semester subjects, log daily study hours, maintain revision tasks, and share curriculum resources.
          </p>

          <div className="welcome-features-list">
            <div className="welcome-feature-item">
              <BookOpen size={18} className="feature-icon" />
              <div>
                <strong>Student Portal:</strong> Track syllabus completion across subjects, run an active study timer, and view faculty notifications.
              </div>
            </div>

            <div className="welcome-feature-item">
              <Users size={18} className="feature-icon" />
              <div>
                <strong>Faculty Portal:</strong> View course syllabi, create learning modules, and simulate student coursework assignments.
              </div>
            </div>

            <div className="welcome-feature-item">
              <CheckSquare size={18} className="feature-icon" />
              <div>
                <strong>Revision Planner:</strong> Manage daily study checklists with Redux Toolkit actions (Add, Toggle, Delete).
              </div>
            </div>

            <div className="welcome-feature-item">
              <Clock size={18} className="feature-icon" />
              <div>
                <strong>Time-Based Greetings:</strong> Dynamic personalized greetings based on actual local time and registered user name.
              </div>
            </div>
          </div>

          <div className="brand-footer-note">
            <span>CSE 4th Semester Web Development Project • React & React Router</span>
          </div>
        </div>
      </div>

      {/* Right Column: Role Selection */}
      <div className="welcome-right-role">
        <div className="role-selection-box">
          <div className="role-select-header">
            <h2>Select Your Role</h2>
            <p>Please choose whether you want to enter as a Student or Faculty member to continue.</p>
          </div>

          <div className="role-cards-container">
            {/* Student Role Card */}
            <div className="role-choice-card">
              <div className="role-choice-icon-wrap student-icon">
                <BookOpen size={24} />
              </div>
              <div className="role-choice-content">
                <div className="role-choice-title-row">
                  <h3>Student</h3>
                  <span className="role-tag">Learner</span>
                </div>
                <p>
                  View enrolled subjects, track syllabus progress, record focus study sessions, and review revision tasks.
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSelectRole('student')}
                >
                  <span>Continue as Student</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Teacher Role Card */}
            <div className="role-choice-card">
              <div className="role-choice-icon-wrap teacher-icon">
                <Users size={24} />
              </div>
              <div className="role-choice-content">
                <div className="role-choice-title-row">
                  <h3>Faculty / Teacher</h3>
                  <span className="role-tag">Instructor</span>
                </div>
                <p>
                  Manage course subjects, create sample learning modules, and test assignment distribution.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleSelectRole('teacher')}
                >
                  <span>Continue as Faculty</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Demo Fill Buttons for Evaluator Convenience */}
          <div className="evaluator-quick-panel">
            <span className="evaluator-label">Quick Demo Access:</span>
            <div className="evaluator-buttons">
              <button
                type="button"
                className="btn-demo-chip"
                onClick={() => handleQuickDemo('student')}
              >
                Enter as Demo Student (Smark Singh)
              </button>
              <button
                type="button"
                className="btn-demo-chip"
                onClick={() => handleQuickDemo('teacher')}
              >
                Enter as Demo Faculty (Prof. Sharma)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
