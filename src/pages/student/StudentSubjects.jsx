import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Trash2, ArrowRight, CheckCircle2, Search, X } from 'lucide-react';
import { useSubjects } from '../../context/SubjectContext';
import FormField from '../../components/common/FormField';

export function StudentSubjects() {
  const { subjects, addSubject, removeSubject } = useSubjects();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    instructor: '',
    credits: '3',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const validateSubjectForm = () => {
    const errs = {};
    if (!formData.code.trim()) {
      errs.code = 'Subject code is required (e.g. CS-301).';
    }
    if (!formData.name.trim()) {
      errs.name = 'Subject title is required.';
    }
    if (!formData.instructor.trim()) {
      errs.instructor = 'Instructor name is required.';
    }
    return errs;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCreateSubject = (e) => {
    e.preventDefault();
    const errs = validateSubjectForm();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addSubject(formData);
    setFormData({ code: '', name: '', instructor: '', credits: '3', description: '' });
    setErrors({});
    setIsAddModalOpen(false);
  };

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-simple-container">
      {/* Header Bar */}
      <div className="page-simple-header">
        <div>
          <h2>My Subjects</h2>
          <p>Enrolled semester courses and syllabus progression.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} />
          <span>Add Subject</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="search-bar-simple">
        <div className="search-box-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input-field"
            placeholder="Search by code, title, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="btn-clear-search" onClick={() => setSearchTerm('')}>
              <X size={14} />
            </button>
          )}
        </div>
        <span className="search-count-label">
          {filteredSubjects.length} of {subjects.length} Subjects
        </span>
      </div>

      {/* Subjects Grid */}
      <div className="subjects-simple-grid">
        {filteredSubjects.map((subject) => {
          const completedTopics = subject.topics.filter((t) => t.completed).length;
          const totalTopics = subject.topics.length;

          return (
            <div key={subject.id} className="subject-box-card">
              <div className="subject-card-head">
                <span className="code-badge">{subject.code}</span>
                <span className="credits-text">{subject.credits} Credits</span>
              </div>

              <h3>{subject.name}</h3>
              <p className="instructor-sub">Instructor: {subject.instructor}</p>
              <p className="subject-desc-short">{subject.description}</p>

              {/* Progress */}
              <div className="subject-progress-box">
                <div className="progress-text-row">
                  <span>Syllabus Progress</span>
                  <strong>{subject.progress}%</strong>
                </div>
                <div className="progress-bar-simple">
                  <div
                    className="progress-bar-inner"
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
                <span className="topics-subtext">
                  {completedTopics} of {totalTopics} units completed
                </span>
              </div>

              {/* Actions */}
              <div className="subject-actions-row">
                <Link
                  to={`/student/subjects/${subject.id}`}
                  className="btn btn-primary btn-xs"
                >
                  <span>View Syllabus</span>
                  <ArrowRight size={13} />
                </Link>

                <button
                  type="button"
                  className="btn-delete-plain"
                  onClick={() => removeSubject(subject.id)}
                  title="Remove subject"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="empty-box-simple">
          <p>No subjects found matching your search.</p>
        </div>
      )}

      {/* Add Subject Modal */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Subject</h3>
              <button className="btn-close" onClick={() => setIsAddModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateSubject}>
              <div className="modal-body">
                <FormField
                  id="code"
                  name="code"
                  label="Subject Code"
                  placeholder="e.g. CS-301"
                  value={formData.code}
                  onChange={handleFormChange}
                  error={errors.code}
                  required
                />

                <FormField
                  id="name"
                  name="name"
                  label="Subject Title"
                  placeholder="e.g. Theory of Computation"
                  value={formData.name}
                  onChange={handleFormChange}
                  error={errors.name}
                  required
                />

                <div className="form-grid-2col">
                  <FormField
                    id="instructor"
                    name="instructor"
                    label="Instructor Name"
                    placeholder="e.g. Prof. Ramanathan"
                    value={formData.instructor}
                    onChange={handleFormChange}
                    error={errors.instructor}
                    required
                  />

                  <FormField
                    id="credits"
                    name="credits"
                    label="Credits"
                    type="number"
                    value={formData.credits}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <FormField
                  id="description"
                  name="description"
                  label="Course Description"
                  type="textarea"
                  placeholder="Short summary of course topics..."
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={2}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentSubjects;
