import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, BookOpen, Layers, Send, Award, ArrowRight, 
  CheckCircle2, Info, X 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSubjects } from '../../context/SubjectContext';

const DEFAULT_MODULES = [
  {
    id: 'mod-1',
    title: 'Advanced Graph Algorithms & Min-Spanning Trees',
    subject: 'Data Structures & Algorithms',
    dateCreated: 'Today',
    status: 'Assigned',
    targetBatch: '3rd Year CSE - Section A'
  },
  {
    id: 'mod-2',
    title: 'Virtual Memory & Page Replacement Policies (FIFO vs LRU)',
    subject: 'Operating Systems',
    dateCreated: '2 days ago',
    status: 'Assigned',
    targetBatch: '3rd Year CSE - Section B'
  },
  {
    id: 'mod-3',
    title: 'SQL Normalization & Boyce-Codd Normal Form Worksheets',
    subject: 'Database Management Systems',
    dateCreated: 'Last week',
    status: 'Draft',
    targetBatch: '2nd Year CSE'
  }
];

export function TeacherDashboard() {
  const { currentUser } = useAuth();
  const { subjects } = useSubjects();

  const [modules, setModules] = useState(() => {
    try {
      const stored = localStorage.getItem('acaderix_teacher_modules');
      return stored ? JSON.parse(stored) : DEFAULT_MODULES;
    } catch {
      return DEFAULT_MODULES;
    }
  });

  const [assignNotice, setAssignNotice] = useState(null);

  const handleAssignClick = (moduleItem) => {
    setAssignNotice({
      title: moduleItem.title,
      subject: moduleItem.subject,
      targetBatch: moduleItem.targetBatch
    });
  };

  return (
    <div className="dashboard-page-container">
      {/* Metrics Row */}
      <div className="metrics-simple-grid">
        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-label">Assigned Subjects</span>
            <BookOpen size={18} className="text-primary" />
          </div>
          <div className="metric-box-val">
            <span className="metric-num">{subjects.length}</span>
            <span className="metric-unit">Courses</span>
          </div>
          <span className="metric-hint">Current curriculum</span>
        </div>

        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-label">Course Modules</span>
            <Layers size={18} className="text-secondary" />
          </div>
          <div className="metric-box-val">
            <span className="metric-num">{modules.length}</span>
            <span className="metric-unit">Total</span>
          </div>
          <span className="metric-hint">Drafts & Published</span>
        </div>

        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-label">Assigned Modules</span>
            <Send size={18} className="text-success" />
          </div>
          <div className="metric-box-val">
            <span className="metric-num">
              {modules.filter((m) => m.status === 'Assigned').length}
            </span>
            <span className="metric-unit">Active</span>
          </div>
          <span className="metric-hint">Shared with students</span>
        </div>
      </div>

      {/* Faculty Profile Overview Bar */}
      <div className="profile-summary-box">
        <div className="profile-summary-info">
          <h3>{currentUser?.fullName}</h3>
          <p>
            Faculty ID: <strong>{currentUser?.teacherId}</strong> • Institute: <strong>{currentUser?.instituteName}</strong> • Mobile: <strong>{currentUser?.mobileNumber}</strong>
          </p>
        </div>
        <Link to="/teacher/modules" className="btn btn-secondary btn-sm">
          <Layers size={14} />
          <span>Manage Modules</span>
        </Link>
      </div>

      {/* Assigned Modules Table */}
      <div className="card-simple">
        <div className="card-simple-header-row">
          <div>
            <h3>Course Modules</h3>
            <p>List of learning modules created for your courses.</p>
          </div>
          <Link to="/teacher/modules" className="btn-link-simple">
            Create New Module &rarr;
          </Link>
        </div>

        <div className="table-responsive">
          <table className="simple-table">
            <thead>
              <tr>
                <th>Module Title</th>
                <th>Subject</th>
                <th>Target Class</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.id}>
                  <td>
                    <strong>{m.title}</strong>
                    <div className="cell-date">Added: {m.dateCreated}</div>
                  </td>
                  <td>
                    <span className="tag-plain">{m.subject}</span>
                  </td>
                  <td>{m.targetBatch}</td>
                  <td>
                    <span className={`status-badge ${m.status === 'Assigned' ? 'assigned' : 'draft'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline btn-xs"
                      onClick={() => handleAssignClick(m)}
                    >
                      <Send size={12} />
                      <span>Assign</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Placeholder Modal */}
      {assignNotice && (
        <div className="modal-backdrop" onClick={() => setAssignNotice(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Module Assignment Placeholder</h3>
              <button className="btn-close" onClick={() => setAssignNotice(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="modal-body">
              <p>
                <strong>Module:</strong> {assignNotice.title}<br />
                <strong>Subject:</strong> {assignNotice.subject}<br />
                <strong>Target Class:</strong> {assignNotice.targetBatch}
              </p>

              <div className="demo-notice-box">
                <Info size={16} />
                <span>
                  <strong>Demo Placeholder:</strong> In a full production application with a backend database, clicking "Assign" would broadcast this module to enrolled students. This frontend prototype demonstrates the action without claiming live delivery.
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setAssignNotice(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
