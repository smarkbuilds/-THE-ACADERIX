import React, { useState } from 'react';
import { Library, FileText, Download, CheckCircle2 } from 'lucide-react';
import { useSubjects } from '../../context/SubjectContext';

const SAMPLE_RESOURCES = [
  {
    id: 'res-1',
    title: 'Algorithmic Complexity & Master Theorem Notes',
    subject: 'Data Structures & Algorithms',
    type: 'PDF Notes',
    size: '1.2 MB',
    author: 'Prof. S. Sharma',
    description: 'Time & space complexity summary for trees, heaps, and sorting routines.'
  },
  {
    id: 'res-2',
    title: 'Process Synchronization & Semaphores Lab Guide',
    subject: 'Operating Systems',
    type: 'Lab Manual',
    size: '2.4 MB',
    author: 'Dr. V. Rao',
    description: 'Instructions for thread creation and bounded buffer producer-consumer implementation.'
  },
  {
    id: 'res-3',
    title: 'SQL Normalization & Decomposition Practice Sheet',
    subject: 'Database Management Systems',
    type: 'Worksheet',
    size: '1.8 MB',
    author: 'Prof. Ananya Gupta',
    description: 'Worked examples decomposing tables into 1NF, 2NF, 3NF, and BCNF.'
  },
  {
    id: 'res-4',
    title: 'Computer Networks Packet Sniffing & TCP Handshake',
    subject: 'Computer Networks',
    type: 'Study Guide',
    size: '3.1 MB',
    author: 'Dr. K. Mehta',
    description: 'Summary of TCP 3-way handshake, OSI layers, and packet capture analysis.'
  }
];

export function StudentResources() {
  const { subjects } = useSubjects();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [downloadNotice, setDownloadNotice] = useState('');

  const filteredResources = selectedSubject === 'all'
    ? SAMPLE_RESOURCES
    : SAMPLE_RESOURCES.filter((r) => r.subject === selectedSubject);

  const handleDownload = (title) => {
    setDownloadNotice(`Downloading: "${title}" (Sample resource file)`);
    setTimeout(() => setDownloadNotice(''), 3000);
  };

  return (
    <div className="page-simple-container">
      <div className="page-simple-header">
        <div>
          <h2>Academic Resources</h2>
          <p>Lecture slides, lab manuals, and faculty reference handouts.</p>
        </div>
      </div>

      {downloadNotice && (
        <div className="simple-alert-success">
          <CheckCircle2 size={16} />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="task-filters-row">
        <button
          type="button"
          className={`filter-btn ${selectedSubject === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedSubject('all')}
        >
          All ({SAMPLE_RESOURCES.length})
        </button>
        {subjects.map((subj) => (
          <button
            key={subj.id}
            type="button"
            className={`filter-btn ${selectedSubject === subj.name ? 'active' : ''}`}
            onClick={() => setSelectedSubject(subj.name)}
          >
            {subj.code}
          </button>
        ))}
      </div>

      {/* Resources List */}
      <div className="resources-simple-grid">
        {filteredResources.map((res) => (
          <div key={res.id} className="resource-item-box">
            <div className="resource-box-top">
              <span className="code-badge">{res.type}</span>
              <span className="res-size">{res.size}</span>
            </div>

            <h4>{res.title}</h4>
            <p className="res-desc">{res.description}</p>

            <div className="res-meta-line">
              <span>{res.subject}</span> • <span>By {res.author}</span>
            </div>

            <button
              type="button"
              className="btn btn-outline btn-xs full-width"
              onClick={() => handleDownload(res.title)}
            >
              <Download size={13} />
              <span>Download File</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentResources;
