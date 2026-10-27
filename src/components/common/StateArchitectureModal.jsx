import React from 'react';
import { Layers, CheckCircle2, X } from 'lucide-react';

export function StateArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card wide-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-simple">
            <Layers size={18} className="text-primary" />
            <h3>State Architecture (Evaluation Rubric)</h3>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <p className="card-subtext">
            Summary of where different pieces of state live in this React project:
          </p>

          <div className="state-simple-grid">
            {/* 1. AuthContext */}
            <div className="state-box-simple">
              <div className="state-box-head">
                <span className="badge-tech context">Context API</span>
                <h4>AuthContext</h4>
              </div>
              <p><strong>Holds:</strong> Current user profile, role (`student` or `teacher`), and logout action.</p>
              <p><strong>Lifecycle:</strong> In-memory React state for the active session (resets on page reload).</p>
              <p className="why-text"><strong>Why Context:</strong> Keeps user session accessible to all components and route guards without prop drilling.</p>
            </div>

            {/* 2. SubjectContext */}
            <div className="state-box-simple">
              <div className="state-box-head">
                <span className="badge-tech context">Context API</span>
                <h4>SubjectContext</h4>
              </div>
              <p><strong>Holds:</strong> Enrolled academic subjects, credits, syllabus topics, and progress updates.</p>
              <p><strong>Lifecycle:</strong> Shared catalog accessed by dashboard, subject list, and dynamic route `/student/subjects/:subjectId`.</p>
              <p className="why-text"><strong>Why Context:</strong> Centralizes course syllabus data across multiple student views.</p>
            </div>

            {/* 3. Redux Toolkit */}
            <div className="state-box-simple">
              <div className="state-box-head">
                <span className="badge-tech redux">Redux Toolkit</span>
                <h4>revisionSlice (Store)</h4>
              </div>
              <p><strong>Holds:</strong> Revision tasks list and current filter (`all`, `pending`, `completed`).</p>
              <p><strong>Actions:</strong> `addTask`, `toggleTaskComplete`, `removeTask`, `setFilter`.</p>
              <p className="why-text"><strong>Why Redux:</strong> Demonstrates action creators, dispatchers, and predictable immutable state updates with RTK `createSlice`.</p>
            </div>

            {/* 4. Local useState */}
            <div className="state-box-simple">
              <div className="state-box-head">
                <span className="badge-tech local">Local useState</span>
                <h4>Component UI State</h4>
              </div>
              <p><strong>Holds:</strong> Controlled form inputs, validation error messages, active study timer interval, and modal visibility.</p>
              <p><strong>Lifecycle:</strong> Scoped to individual components.</p>
              <p className="why-text"><strong>Why useState:</strong> Keeps component-specific transient UI state lightweight and isolated.</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default StateArchitectureModal;
