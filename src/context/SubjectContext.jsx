import React, { createContext, useContext, useState, useEffect } from 'react';

const SubjectContext = createContext(null);

const STORAGE_KEY = 'acaderix_academic_subjects';

const INITIAL_SUBJECTS = [
  {
    id: 'cs-201',
    code: 'CS-201',
    name: 'Data Structures & Algorithms',
    instructor: 'Prof. S. Sharma',
    progress: 75,
    credits: 4,
    description: 'Core computational fundamentals including trees, graphs, sorting algorithms, and dynamic programming.',
    topics: [
      { id: 't1', title: 'Arrays, Stacks & Queues', completed: true },
      { id: 't2', title: 'Linked Lists & Trees', completed: true },
      { id: 't3', title: 'Graph Traversals (BFS/DFS)', completed: true },
      { id: 't4', title: 'Dynamic Programming & Memoization', completed: false }
    ],
    lastStudied: 'Today'
  },
  {
    id: 'cs-202',
    code: 'CS-202',
    name: 'Operating Systems',
    instructor: 'Dr. V. Rao',
    progress: 50,
    credits: 4,
    description: 'Process scheduling, concurrency, virtual memory management, file systems, and kernel architecture.',
    topics: [
      { id: 't1', title: 'Processes & Thread Lifecycle', completed: true },
      { id: 't2', title: 'CPU Scheduling Algorithms', completed: true },
      { id: 't3', title: 'Deadlock Detection & Prevention', completed: false },
      { id: 't4', title: 'Paging & Virtual Memory', completed: false }
    ],
    lastStudied: 'Yesterday'
  },
  {
    id: 'cs-203',
    code: 'CS-203',
    name: 'Database Management Systems',
    instructor: 'Prof. Ananya Gupta',
    progress: 60,
    credits: 3,
    description: 'Relational algebra, SQL normalization (1NF-BCNF), ACID transaction properties, and indexing.',
    topics: [
      { id: 't1', title: 'ER Modeling & Relational Schema', completed: true },
      { id: 't2', title: 'Advanced SQL & Joins', completed: true },
      { id: 't3', title: 'Normalization (3NF, BCNF)', completed: true },
      { id: 't4', title: 'Transactions & Concurrency Control', completed: false }
    ],
    lastStudied: '2 days ago'
  },
  {
    id: 'cs-204',
    code: 'CS-204',
    name: 'Computer Networks',
    instructor: 'Dr. K. Mehta',
    progress: 25,
    credits: 3,
    description: 'OSI 7-layer reference model, TCP/IP stack, routing protocols, flow control, and network security.',
    topics: [
      { id: 't1', title: 'OSI Reference Model & Physical Layer', completed: true },
      { id: 't2', title: 'Data Link Framing & Error Correction', completed: false },
      { id: 't3', title: 'IP Addressing & Subnetting', completed: false },
      { id: 't4', title: 'TCP Handshake & Congestion Control', completed: false }
    ],
    lastStudied: '3 days ago'
  }
];

export function SubjectProvider({ children }) {
  const [subjects, setSubjects] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_SUBJECTS;
    } catch (e) {
      console.error('Failed to load subjects from localStorage', e);
      return INITIAL_SUBJECTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
    } catch (e) {
      console.error('Failed to save subjects to localStorage', e);
    }
  }, [subjects]);

  const addSubject = (newSubject) => {
    const createdSubject = {
      id: newSubject.code ? newSubject.code.toLowerCase().replace(/\s+/g, '-') : `subj-${Date.now()}`,
      code: newSubject.code.toUpperCase(),
      name: newSubject.name,
      instructor: newSubject.instructor || 'Staff Faculty',
      progress: 0,
      credits: Number(newSubject.credits) || 3,
      description: newSubject.description || 'Comprehensive curriculum module for semester coursework.',
      topics: newSubject.topics && newSubject.topics.length > 0 
        ? newSubject.topics 
        : [
            { id: 't1', title: 'Unit 1: Introduction & Fundamentals', completed: false },
            { id: 't2', title: 'Unit 2: Core Theoretical Frameworks', completed: false },
            { id: 't3', title: 'Unit 3: Applied Practicals & Problem Sets', completed: false }
          ],
      lastStudied: 'Not yet started'
    };

    setSubjects((prev) => [createdSubject, ...prev]);
    return createdSubject;
  };

  const removeSubject = (subjectId) => {
    setSubjects((prev) => prev.filter((s) => s.id !== subjectId));
  };

  const toggleTopicCompletion = (subjectId, topicId) => {
    setSubjects((prev) =>
      prev.map((subject) => {
        if (subject.id !== subjectId) return subject;

        const updatedTopics = subject.topics.map((t) =>
          t.id === topicId ? { ...t, completed: !t.completed } : t
        );

        const completedCount = updatedTopics.filter((t) => t.completed).length;
        const totalCount = updatedTopics.length;
        const calculatedProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        return {
          ...subject,
          topics: updatedTopics,
          progress: calculatedProgress,
          lastStudied: 'Today'
        };
      })
    );
  };

  const getSubjectById = (subjectId) => {
    return subjects.find((s) => s.id === subjectId || s.code.toLowerCase() === subjectId.toLowerCase());
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        addSubject,
        removeSubject,
        toggleTopicCompletion,
        getSubjectById
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export function useSubjects() {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('useSubjects must be used within a SubjectProvider');
  }
  return context;
}
