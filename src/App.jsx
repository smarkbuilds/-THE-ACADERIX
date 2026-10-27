import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import WelcomePage from './pages/WelcomePage';
import StudentRegistration from './pages/StudentRegistration';
import TeacherRegistration from './pages/TeacherRegistration';
import NotFoundPage from './pages/NotFoundPage';

// Student Pages
import StudentLayout from './components/layout/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentSubjects from './pages/student/StudentSubjects';
import StudentSubjectDetail from './pages/student/StudentSubjectDetail';
import StudentRevision from './pages/student/StudentRevision';
import StudentResources from './pages/student/StudentResources';

// Teacher Pages
import TeacherLayout from './components/layout/TeacherLayout';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherModules from './pages/teacher/TeacherModules';
import TeacherProfile from './pages/teacher/TeacherProfile';

// Route Guards
import ProtectedRoute from './components/routes/ProtectedRoute';
import RoleRoute from './components/routes/RoleRoute';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing & Role Selection */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register/student" element={<StudentRegistration />} />
        <Route path="/register/teacher" element={<TeacherRegistration />} />

        {/* Student Protected Nested Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="student">
                <StudentLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="subjects" element={<StudentSubjects />} />
          <Route path="subjects/:subjectId" element={<StudentSubjectDetail />} />
          <Route path="revision" element={<StudentRevision />} />
          <Route path="resources" element={<StudentResources />} />
        </Route>

        {/* Teacher Protected Nested Routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="teacher">
                <TeacherLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="modules" element={<TeacherModules />} />
          <Route path="profile" element={<TeacherProfile />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
