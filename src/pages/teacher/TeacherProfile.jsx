import React from 'react';
import { UserCheck, Award, Building, Phone, Hash, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function TeacherProfile() {
  const { currentUser } = useAuth();

  return (
    <div className="page-simple-container">
      <div className="page-simple-header">
        <div>
          <h2>Faculty Profile</h2>
          <p>Instructor identification and department affiliation.</p>
        </div>
      </div>

      <div className="profile-details-grid">
        {/* Main Details */}
        <div className="card-simple">
          <div className="profile-header-simple">
            <div className="avatar-simple">
              <UserCheck size={28} />
            </div>
            <div>
              <h3>{currentUser?.fullName}</h3>
              <span className="badge-plain">Faculty Instructor</span>
            </div>
          </div>

          <div className="profile-list-simple">
            <div className="profile-row-item">
              <span className="profile-label">Teacher ID</span>
              <strong className="profile-val">{currentUser?.teacherId}</strong>
            </div>

            <div className="profile-row-item">
              <span className="profile-label">Institution</span>
              <strong className="profile-val">{currentUser?.instituteName}</strong>
            </div>

            <div className="profile-row-item">
              <span className="profile-label">Contact Number</span>
              <strong className="profile-val">{currentUser?.mobileNumber}</strong>
            </div>

            <div className="profile-row-item">
              <span className="profile-label">Session Status</span>
              <strong className="profile-val">Active In-Memory Session</strong>
            </div>
          </div>
        </div>

        {/* Project Notes */}
        <div className="card-simple">
          <h3>Project & State Notes</h3>
          <p className="card-subtext">Implementation details for evaluation.</p>

          <div className="notes-list-simple">
            <div className="note-item">
              <strong>In-Memory Session:</strong>
              <p>User authentication state is stored in React memory (`useState` / Context API). When the page is reloaded, the session resets to the initial welcome screen as expected in a student demo project.</p>
            </div>

            <div className="note-item">
              <strong>Role Protection:</strong>
              <p>Routes under `/teacher` are protected so student accounts cannot access faculty views, and vice versa.</p>
            </div>

            <div className="note-item">
              <strong>Demonstration Actions:</strong>
              <p>Course module assignment is a simulated placeholder without external backend server dependencies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
