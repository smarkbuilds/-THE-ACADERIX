import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Circle, User, Award, Clock, AlertTriangle, FileText 
} from 'lucide-react';
import { useSubjects } from '../../context/SubjectContext';

export function StudentSubjectDetail() {
  const { subjectId } = useParams();
  const { getSubjectById, toggleTopicCompletion } = useSubjects();

  const subject = getSubjectById(subjectId);

  if (!subject) {
    return (
      <div className="card-simple">
        <AlertTriangle size={32} className="text-warning" />
        <h3>Subject Not Found</h3>
        <p>No subject found with ID "{subjectId}".</p>
        <Link to="/student/subjects" className="btn btn-primary btn-sm">
          <ArrowLeft size={14} />
          <span>Return to Subjects</span>
        </Link>
      </div>
    );
  }

  const completedCount = subject.topics.filter((t) => t.completed).length;
  const totalCount = subject.topics.length;

  return (
    <div className="page-simple-container">
      {/* Back button & Route Indicator */}
      <div className="detail-top-nav">
        <Link to="/student/subjects" className="btn-back-link">
          <ArrowLeft size={15} />
          <span>Back to Subjects</span>
        </Link>
        <span className="route-tag">Route: /student/subjects/{subjectId}</span>
      </div>

      {/* Main Subject Info Card */}
      <div className="card-simple">
        <div className="detail-header-row">
          <div>
            <span className="code-badge">{subject.code}</span>
            <h2 className="detail-title">{subject.name}</h2>
            <p className="detail-desc">{subject.description}</p>
          </div>

          <div className="detail-progress-summary">
            <span className="summary-pct">{subject.progress}%</span>
            <span className="summary-label">Progress</span>
            <div className="progress-bar-simple">
              <div 
                className="progress-bar-inner" 
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
            <span className="summary-units">{completedCount} of {totalCount} units done</span>
          </div>
        </div>

        <div className="detail-meta-list">
          <span>Instructor: <strong>{subject.instructor}</strong></span>
          <span>Credits: <strong>{subject.credits}</strong></span>
          <span>Last Studied: <strong>{subject.lastStudied}</strong></span>
        </div>
      </div>

      {/* Syllabus Topics */}
      <div className="card-simple">
        <h3>Syllabus Units & Topics</h3>
        <p className="card-subtext">Click any unit to toggle completion status (recalculates progress in Context state).</p>

        <div className="topics-list-simple">
          {subject.topics.map((topic, index) => (
            <div
              key={topic.id}
              className={`topic-row-simple ${topic.completed ? 'completed' : ''}`}
              onClick={() => toggleTopicCompletion(subject.id, topic.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleTopicCompletion(subject.id, topic.id)}
            >
              <div className="topic-check">
                {topic.completed ? (
                  <CheckCircle2 size={18} className="text-success" />
                ) : (
                  <Circle size={18} className="text-muted" />
                )}
              </div>
              <div className="topic-title-col">
                <span className="unit-tag">Unit {index + 1}</span>
                <span className="topic-name">{topic.title}</span>
              </div>
              <span className={`status-text ${topic.completed ? 'done' : 'pending'}`}>
                {topic.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Study References */}
      <div className="card-simple">
        <h3>Reference Notes & Handouts</h3>
        <div className="resources-mini-grid">
          <div className="resource-mini-box">
            <FileText size={16} />
            <div>
              <strong>Lecture Slides (PDF)</strong>
              <p>Handouts covering syllabus units and sample problems.</p>
            </div>
          </div>
          <div className="resource-mini-box">
            <FileText size={16} />
            <div>
              <strong>Practice Question Bank</strong>
              <p>Sample mid-term and end-term questions with solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSubjectDetail;
