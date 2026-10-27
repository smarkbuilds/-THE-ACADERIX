import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Play, Pause, RotateCcw, Save, Flame, Clock, BookOpen, 
  CheckSquare, ArrowRight, Bell, CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSubjects } from '../../context/SubjectContext';
import { selectAllTasks } from '../../redux/revisionSlice';
import { formatTime } from '../../utils/timeGreeting';
import { getStreakData, recordStudySession, getStudyLogs } from '../../utils/streakTracker';
import StreakInfoModal from '../../components/common/StreakInfoModal';
import NotificationModal from '../../components/common/NotificationModal';

export function StudentDashboard() {
  const { currentUser } = useAuth();
  const { subjects } = useSubjects();
  const revisionTasks = useSelector(selectAllTasks);

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionSavedMsg, setSessionSavedMsg] = useState('');
  const timerRef = useRef(null);

  // Streak & Study Data state
  const [streakData, setStreakData] = useState(() => getStreakData());
  const [studyLogs, setStudyLogs] = useState(() => getStudyLogs());

  // Modals state
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  // Timer interval effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const handleStartTimer = () => setIsTimerRunning(true);
  const handlePauseTimer = () => setIsTimerRunning(false);

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const handleRecordSession = () => {
    if (timerSeconds < 5) {
      setSessionSavedMsg('Please study for at least 5 seconds before recording.');
      setTimeout(() => setSessionSavedMsg(''), 3000);
      return;
    }

    setIsTimerRunning(false);
    const updated = recordStudySession(timerSeconds);
    setStreakData(updated);
    setStudyLogs(getStudyLogs());
    const formatted = formatTime(timerSeconds);
    setTimerSeconds(0);
    setSessionSavedMsg(`Saved ${formatted} focus session! Daily study activity recorded.`);
    setTimeout(() => setSessionSavedMsg(''), 4000);
  };

  const pendingTasks = revisionTasks.filter((t) => !t.completed);

  return (
    <div className="dashboard-page-container">
      {/* Teacher Assignment Notification Banner */}
      <div 
        className="banner-notice-box" 
        onClick={() => setIsNoticeModalOpen(true)} 
        role="button" 
        tabIndex={0}
      >
        <div className="banner-notice-icon">
          <Bell size={18} />
          <span className="notice-badge">1</span>
        </div>
        <div className="banner-notice-text">
          <div className="notice-title-row">
            <span className="notice-tag">New Faculty Notice</span>
            <span className="notice-time">Today</span>
          </div>
          <p>
            Prof. S. Sharma shared <strong>"Advanced Graph Algorithms & Min-Spanning Trees"</strong> for Data Structures (CS-201).
          </p>
        </div>
        <button type="button" className="btn btn-outline btn-xs">
          View Notice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="metrics-simple-grid">
        <div 
          className="metric-box clickable" 
          onClick={() => setIsStreakModalOpen(true)}
          title="Click to view streak tracking logic"
        >
          <div className="metric-box-top">
            <span className="metric-label">Daily Study Streak</span>
            <Flame size={18} className="text-flame" />
          </div>
          <div className="metric-box-val">
            <span className="metric-num">{streakData.streakCount}</span>
            <span className="metric-unit">Days</span>
          </div>
          <span className="metric-hint">Click to see streak logic</span>
        </div>

        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-label">Enrolled Subjects</span>
            <BookOpen size={18} className="text-primary" />
          </div>
          <div className="metric-box-val">
            <span className="metric-num">{subjects.length}</span>
            <span className="metric-unit">Courses</span>
          </div>
          <span className="metric-hint">Current semester</span>
        </div>

        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-label">Pending Revision</span>
            <CheckSquare size={18} className="text-warning" />
          </div>
          <div className="metric-box-val">
            <span className="metric-num">{pendingTasks.length}</span>
            <span className="metric-unit">Tasks</span>
          </div>
          <span className="metric-hint">Managed via Redux</span>
        </div>

        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-label">Total Time Studied</span>
            <Clock size={18} className="text-success" />
          </div>
          <div className="metric-box-val">
            <span className="metric-num">{Math.round(streakData.totalSeconds / 60)}</span>
            <span className="metric-unit">Mins</span>
          </div>
          <span className="metric-hint">Recorded sessions</span>
        </div>
      </div>

      {/* Main Grid: Timer & Subjects Section */}
      <div className="dashboard-content-grid">
        {/* Study Timer Card */}
        <div className="card-simple">
          <div className="card-simple-header">
            <h3>Study Focus Timer</h3>
            <p>Start the timer while studying and save your session when done.</p>
          </div>

          <div className="timer-box-simple">
            <div className={`timer-digits-simple ${isTimerRunning ? 'running' : ''}`}>
              {formatTime(timerSeconds)}
            </div>
            <div className="timer-status-text">
              {isTimerRunning ? 'Timer is running...' : timerSeconds > 0 ? 'Timer is paused' : 'Timer is ready'}
            </div>
          </div>

          {/* Controls */}
          <div className="timer-btn-row">
            {!isTimerRunning ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleStartTimer}
              >
                <Play size={15} />
                <span>Start</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-warning"
                onClick={handlePauseTimer}
              >
                <Pause size={15} />
                <span>Pause</span>
              </button>
            )}

            <button
              type="button"
              className="btn btn-success"
              onClick={handleRecordSession}
              disabled={timerSeconds === 0}
            >
              <Save size={15} />
              <span>Save Session</span>
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={handleResetTimer}
              disabled={timerSeconds === 0}
            >
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
          </div>

          {sessionSavedMsg && (
            <div className="simple-alert-success">
              <CheckCircle2 size={16} />
              <span>{sessionSavedMsg}</span>
            </div>
          )}

          {/* Recent study logs */}
          <div className="recent-logs-block">
            <h4>Recent Study Logs</h4>
            {studyLogs.length === 0 ? (
              <p className="empty-subtext">No study sessions logged yet today.</p>
            ) : (
              <ul className="logs-list-simple">
                {studyLogs.slice(0, 3).map((log) => (
                  <li key={log.id}>
                    <strong>{formatTime(log.durationSeconds)}</strong> — {log.date} at {log.timestamp}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Enrolled Subjects List */}
        <div className="card-simple">
          <div className="card-simple-header-row">
            <div>
              <h3>My Subjects</h3>
              <p>Current semester subjects and syllabus progress.</p>
            </div>
            <Link to="/student/subjects" className="btn-link-simple">
              View All &rarr;
            </Link>
          </div>

          <div className="subjects-simple-list">
            {subjects.slice(0, 3).map((subject) => (
              <div key={subject.id} className="subject-item-box">
                <div className="subject-item-header">
                  <span className="code-badge">{subject.code}</span>
                  <span className="instructor-name">{subject.instructor}</span>
                </div>
                <h4>{subject.name}</h4>

                <div className="progress-wrap">
                  <div className="progress-text-row">
                    <span>Progress</span>
                    <strong>{subject.progress}%</strong>
                  </div>
                  <div className="progress-bar-simple">
                    <div 
                      className="progress-bar-inner" 
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="subject-box-bottom">
                  <span className="topic-sub">
                    {subject.topics.filter((t) => t.completed).length} of {subject.topics.length} units done
                  </span>
                  <Link
                    to={`/student/subjects/${subject.id}`}
                    className="link-btn"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <StreakInfoModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
      />
      <NotificationModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
      />
    </div>
  );
}

export default StudentDashboard;
