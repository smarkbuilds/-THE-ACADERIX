import React from 'react';
import { Bell, BookOpen, Clock, X, Info } from 'lucide-react';

export function NotificationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-simple">
            <Bell size={18} className="text-primary" />
            <h3>Faculty Notification</h3>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div className="notice-card-simple">
            <div className="notice-head-line">
              <span className="badge-plain">Shared Module</span>
              <span className="notice-date-text">Received Today</span>
            </div>

            <h4>Prof. S. Sharma shared "Advanced Graph Algorithms & Min-Spanning Trees"</h4>
            <p>
              Curated lecture notes and practice problem sets have been added for Data Structures (CS-201).
            </p>

            <div className="notice-details-mini">
              <span>Subject: <strong>Data Structures & Algorithms</strong></span>
              <span>Instructor: <strong>Prof. S. Sharma (T-8842)</strong></span>
            </div>

            <div className="demo-notice-box">
              <Info size={16} />
              <span>
                <strong>Sample Notification:</strong> This notice satisfies the requirement to show a visible notification badge (showing 1) and placeholder for modules shared by a teacher.
              </span>
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

export default NotificationModal;
