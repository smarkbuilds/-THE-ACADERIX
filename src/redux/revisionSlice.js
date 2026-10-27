import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'acaderix_revision_tasks';

const INITIAL_TASKS = [
  {
    id: 'rev-1',
    title: 'Review AVL Tree balancing rotations and time complexities',
    subject: 'Data Structures & Algorithms',
    priority: 'high',
    completed: false,
    dueDate: 'Today'
  },
  {
    id: 'rev-2',
    title: 'Solve CPU scheduling numerical problems (RR & SJF)',
    subject: 'Operating Systems',
    priority: 'medium',
    completed: true,
    dueDate: 'Yesterday'
  },
  {
    id: 'rev-3',
    title: 'Practice SQL 3NF decomposition and candidate key identification',
    subject: 'Database Management Systems',
    priority: 'high',
    completed: false,
    dueDate: 'Tomorrow'
  },
  {
    id: 'rev-4',
    title: 'Summarize TCP 3-Way Handshake vs UDP connectionless model',
    subject: 'Computer Networks',
    priority: 'low',
    completed: false,
    dueDate: 'In 2 days'
  }
];

const loadTasksFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_TASKS;
  } catch (err) {
    console.error('Failed to load revision tasks from localStorage', err);
    return INITIAL_TASKS;
  }
};

const revisionSlice = createSlice({
  name: 'revision',
  initialState: {
    tasks: loadTasksFromStorage(),
    filter: 'all' // 'all' | 'pending' | 'completed'
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: `rev-${Date.now()}`,
        title: action.payload.title,
        subject: action.payload.subject || 'General Study',
        priority: action.payload.priority || 'medium',
        completed: false,
        dueDate: action.payload.dueDate || 'Upcoming'
      };
      state.tasks.unshift(newTask);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
      } catch (e) {
        console.error(e);
      }
    },
    toggleTaskComplete: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
        } catch (e) {
          console.error(e);
        }
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
      } catch (e) {
        console.error(e);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { addTask, toggleTaskComplete, removeTask, setFilter } = revisionSlice.actions;

export const selectAllTasks = (state) => state.revision.tasks;
export const selectFilter = (state) => state.revision.filter;
export const selectFilteredTasks = (state) => {
  const { tasks, filter } = state.revision;
  if (filter === 'completed') return tasks.filter((t) => t.completed);
  if (filter === 'pending') return tasks.filter((t) => !t.completed);
  return tasks;
};

export default revisionSlice.reducer;
