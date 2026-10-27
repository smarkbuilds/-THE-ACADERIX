import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  CheckSquare, Plus, Trash2, CheckCircle2, Circle, 
  Tag, Calendar 
} from 'lucide-react';
import { 
  selectAllTasks, 
  selectFilteredTasks, 
  selectFilter, 
  addTask, 
  toggleTaskComplete, 
  removeTask, 
  setFilter 
} from '../../redux/revisionSlice';
import { useSubjects } from '../../context/SubjectContext';
import FormField from '../../components/common/FormField';

export function StudentRevision() {
  const dispatch = useDispatch();
  const allTasks = useSelector(selectAllTasks);
  const tasks = useSelector(selectFilteredTasks);
  const currentFilter = useSelector(selectFilter);
  const { subjects } = useSubjects();

  // Local state for add revision task form
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    priority: 'medium',
    dueDate: 'Today'
  });
  const [error, setError] = useState('');

  const subjectOptions = subjects.map((s) => ({
    value: s.name,
    label: `${s.code} - ${s.name}`
  }));

  const priorityOptions = [
    { value: 'high', label: 'High Priority (Urgent)' },
    { value: 'medium', label: 'Medium Priority (Normal)' },
    { value: 'low', label: 'Low Priority (Optional)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide a revision task title.');
      return;
    }

    dispatch(
      addTask({
        title: formData.title.trim(),
        subject: formData.subject || (subjects[0] ? subjects[0].name : 'General'),
        priority: formData.priority,
        dueDate: formData.dueDate
      })
    );

    setFormData({
      title: '',
      subject: '',
      priority: 'medium',
      dueDate: 'Today'
    });
    setError('');
  };

  const completedCount = allTasks.filter((t) => t.completed).length;
  const pendingCount = allTasks.filter((t) => !t.completed).length;

  return (
    <div className="page-simple-container">
      {/* Header */}
      <div className="page-simple-header">
        <div>
          <h2>Revision Tasks</h2>
          <p>Manage your revision checklist for exams (Demonstrates Redux Toolkit actions).</p>
        </div>

        <div className="task-stats-row">
          <span className="stat-pill pending">Pending: {pendingCount}</span>
          <span className="stat-pill completed">Completed: {completedCount}</span>
        </div>
      </div>

      <div className="revision-two-col">
        {/* Left Column: Form */}
        <div className="card-simple">
          <h3>Add New Task</h3>
          <p className="card-subtext">Dispatches an action to the Redux store.</p>

          <form onSubmit={handleAddTask} className="task-form-simple">
            <FormField
              id="title"
              name="title"
              label="Task / Topic"
              placeholder="e.g. Practice 3 problems on Binary Trees"
              value={formData.title}
              onChange={handleInputChange}
              error={error}
              required
            />

            <FormField
              id="subject"
              name="subject"
              label="Subject"
              type="select"
              placeholder="-- Select Subject --"
              options={subjectOptions}
              value={formData.subject}
              onChange={handleInputChange}
            />

            <div className="form-grid-2col">
              <FormField
                id="priority"
                name="priority"
                label="Priority"
                type="select"
                options={priorityOptions}
                value={formData.priority}
                onChange={handleInputChange}
              />

              <FormField
                id="dueDate"
                name="dueDate"
                label="Target Timeline"
                placeholder="e.g. Today, Tomorrow"
                value={formData.dueDate}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-sm full-width">
              <Plus size={15} />
              <span>Add to Revision List</span>
            </button>
          </form>
        </div>

        {/* Right Column: Task List */}
        <div className="card-simple">
          {/* Filters */}
          <div className="task-filters-row">
            <button
              type="button"
              className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
              onClick={() => dispatch(setFilter('all'))}
            >
              All ({allTasks.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${currentFilter === 'pending' ? 'active' : ''}`}
              onClick={() => dispatch(setFilter('pending'))}
            >
              Pending ({pendingCount})
            </button>
            <button
              type="button"
              className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
              onClick={() => dispatch(setFilter('completed'))}
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* List */}
          <div className="task-items-simple">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`task-row ${task.completed ? 'done' : ''}`}
              >
                <button
                  type="button"
                  className="check-btn"
                  onClick={() => dispatch(toggleTaskComplete(task.id))}
                  title="Toggle status"
                >
                  {task.completed ? (
                    <CheckCircle2 size={18} className="text-success" />
                  ) : (
                    <Circle size={18} className="text-muted" />
                  )}
                </button>

                <div className="task-text-col">
                  <span className={`task-title ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                  </span>
                  <div className="task-meta">
                    <span className="task-subj">{task.subject}</span>
                    <span className={`task-badge priority-${task.priority}`}>
                      {task.priority}
                    </span>
                    <span className="task-date">{task.dueDate}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => dispatch(removeTask(task.id))}
                  title="Delete task"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            {tasks.length === 0 && (
              <p className="empty-subtext">No revision tasks in this list.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentRevision;
