import React, { useState } from 'react';
import { Layers, Plus, Send, Trash2, CheckCircle2, Info, X } from 'lucide-react';
import { useSubjects } from '../../context/SubjectContext';
import FormField from '../../components/common/FormField';

const INITIAL_MODULES = [
  {
    id: 'mod-1',
    title: 'Advanced Graph Algorithms & Min-Spanning Trees',
    subject: 'Data Structures & Algorithms',
    dateCreated: 'Today',
    status: 'Assigned',
    targetBatch: '3rd Year CSE - Section A',
    description: 'Detailed analysis of Prim and Kruskal greedy algorithms with disjoint-set union data structures.'
  },
  {
    id: 'mod-2',
    title: 'Virtual Memory & Page Replacement Policies (FIFO vs LRU)',
    subject: 'Operating Systems',
    dateCreated: '2 days ago',
    status: 'Assigned',
    targetBatch: '3rd Year CSE - Section B',
    description: 'Page fault handling mechanisms, Belady anomaly demonstration, and clock replacement algorithm.'
  },
  {
    id: 'mod-3',
    title: 'SQL Normalization & Boyce-Codd Normal Form Worksheets',
    subject: 'Database Management Systems',
    dateCreated: 'Last week',
    status: 'Draft',
    targetBatch: '2nd Year CSE',
    description: 'Functional dependencies, minimal cover algorithms, and lossless-join decomposition verification.'
  }
];

export function TeacherModules() {
  const { subjects } = useSubjects();

  const [modules, setModules] = useState(() => {
    try {
      const stored = localStorage.getItem('acaderix_teacher_modules');
      return stored ? JSON.parse(stored) : INITIAL_MODULES;
    } catch {
      return INITIAL_MODULES;
    }
  });

  const [formData, setFormData] = useState({
    title: '',
    subject: subjects[0]?.name || 'Data Structures & Algorithms',
    targetBatch: '3rd Year CSE',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [modalFeedback, setModalFeedback] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCreateModule = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Module title is required.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a short description.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newMod = {
      id: `mod-${Date.now()}`,
      title: formData.title.trim(),
      subject: formData.subject,
      targetBatch: formData.targetBatch,
      description: formData.description.trim(),
      dateCreated: 'Today',
      status: 'Assigned'
    };

    const updated = [newMod, ...modules];
    setModules(updated);
    try {
      localStorage.setItem('acaderix_teacher_modules', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setFormData({
      title: '',
      subject: subjects[0]?.name || 'Data Structures & Algorithms',
      targetBatch: '3rd Year CSE',
      description: ''
    });

    setModalFeedback({
      title: newMod.title,
      subject: newMod.subject,
      action: 'created'
    });
  };

  const handleAssignClick = (mod) => {
    setModalFeedback({
      title: mod.title,
      subject: mod.subject,
      action: 'assigned'
    });
  };

  const handleDeleteModule = (id) => {
    const updated = modules.filter((m) => m.id !== id);
    setModules(updated);
    try {
      localStorage.setItem('acaderix_teacher_modules', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const subjectOptions = subjects.map((s) => ({
    value: s.name,
    label: `${s.code} - ${s.name}`
  }));

  return (
    <div className="page-simple-container">
      <div className="page-simple-header">
        <div>
          <h2>Course Modules</h2>
          <p>Create learning modules and test assignment distribution.</p>
        </div>
      </div>

      <div className="revision-two-col">
        {/* Create Module Form */}
        <div className="card-simple">
          <h3>Create Learning Module</h3>
          <p className="card-subtext">Add a module to share with students.</p>

          <form onSubmit={handleCreateModule} className="task-form-simple">
            <FormField
              id="title"
              name="title"
              label="Module Title"
              placeholder="e.g. Graph Algorithms & Shortest Path"
              value={formData.title}
              onChange={handleInputChange}
              error={errors.title}
              required
            />

            <FormField
              id="subject"
              name="subject"
              label="Subject"
              type="select"
              options={subjectOptions}
              value={formData.subject}
              onChange={handleInputChange}
              required
            />

            <FormField
              id="targetBatch"
              name="targetBatch"
              label="Target Class / Batch"
              placeholder="e.g. 3rd Year CSE"
              value={formData.targetBatch}
              onChange={handleInputChange}
              required
            />

            <FormField
              id="description"
              name="description"
              label="Module Description"
              type="textarea"
              placeholder="Outline of syllabus topics and problem sets..."
              value={formData.description}
              onChange={handleInputChange}
              error={errors.description}
              rows={3}
              required
            />

            <button type="submit" className="btn btn-secondary btn-sm full-width">
              <Plus size={15} />
              <span>Create Module</span>
            </button>
          </form>
        </div>

        {/* Modules List */}
        <div className="card-simple">
          <h3>Existing Modules ({modules.length})</h3>
          <p className="card-subtext">Click "Assign Module" to test assignment response.</p>

          <div className="modules-list-box">
            {modules.map((m) => (
              <div key={m.id} className="module-item-simple">
                <div className="module-item-header">
                  <span className="code-badge">{m.subject}</span>
                  <span className={`status-badge ${m.status === 'Assigned' ? 'assigned' : 'draft'}`}>
                    {m.status}
                  </span>
                </div>

                <h4>{m.title}</h4>
                <p className="module-desc">{m.description}</p>
                <span className="module-cohort">Class: {m.targetBatch} • Added: {m.dateCreated}</span>

                <div className="module-actions-row">
                  <button
                    type="button"
                    className="btn btn-outline btn-xs"
                    onClick={() => handleAssignClick(m)}
                  >
                    <Send size={12} />
                    <span>Assign Module</span>
                  </button>

                  <button
                    type="button"
                    className="btn-delete-plain"
                    onClick={() => handleDeleteModule(m.id)}
                    title="Delete module"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Feedback Modal */}
      {modalFeedback && (
        <div className="modal-backdrop" onClick={() => setModalFeedback(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Module Assignment Placeholder</h3>
              <button className="btn-close" onClick={() => setModalFeedback(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="modal-body">
              <p>
                <strong>Module:</strong> {modalFeedback.title}<br />
                <strong>Subject:</strong> {modalFeedback.subject}
              </p>

              <div className="demo-notice-box">
                <Info size={16} />
                <span>
                  <strong>Demo Placeholder:</strong> In a production application with a backend database, this action would assign this module to enrolled student accounts. This is a frontend demonstration placeholder.
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setModalFeedback(null)}
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

export default TeacherModules;
