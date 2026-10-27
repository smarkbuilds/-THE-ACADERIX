import React from 'react';
import { Flame, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { getStreakData } from '../../utils/streakTracker';

export function StreakInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const streakData = getStreakData();

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Daily Study Streak Logic</h3>
          <button className="btn-close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div className="streak-stats-highlight-simple">
            <div className="streak-box-count">
              <span className="big-num">{streakData.streakCount}</span>
              <span className="streak-lbl">Day Streak</span>
            </div>
            <div className="streak-status-chip">
              {streakData.isStreakActive ? (
                <span className="chip-active"><CheckCircle2 size={13} /> Active Today</span>
              ) : (
                <span className="chip-warning"><AlertCircle size={13} /> Study Session Needed</span>
              )}
            </div>
          </div>

          <p className="streak-message-simple">{streakData.statusMessage}</p>

          <div className="tracking-logic-simple">
            <h4>How streak tracking works:</h4>
            <ol>
              <li>
                <strong>Calendar Day Check:</strong> When you click "Save Session" on the timer, Acaderix checks today's date (<code>{streakData.today}</code>).
              </li>
              <li>
                <strong>Consecutive Day:</strong> If your previous recorded study was yesterday, your streak increments by +1.
              </li>
              <li>
                <strong>Same Day:</strong> If you study multiple times on the same day, your streak remains secured.
              </li>
              <li>
                <strong>Missed Day:</strong> If more than 1 day passes without saving a study session, the streak restarts from 1.
              </li>
            </ol>
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

export default StreakInfoModal;
