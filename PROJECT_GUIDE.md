# Acaderix — Complete Project Architecture & Viva Study Guide
**Author:** Smark Singh (B.Tech CSE — Specialization in AI & ML, 2nd Year)  
**Project Name:** Acaderix (Academic Management Portal)  
**Tech Stack:** React 19, React Router DOM v7, Redux Toolkit, Context API, Vanilla CSS, Vite

---

## Table of Contents
1. [Project Overview & Purpose](#1-project-overview--purpose)
2. [Complete Directory & File Map](#2-complete-directory--file-map)
3. [Application Startup Flow (From index.html to Screen)](#3-application-startup-flow)
4. [State Architecture Matrix (Context vs. Redux vs. useState)](#4-state-architecture-matrix)
5. [Routing & Navigation Architecture](#5-routing--navigation-architecture)
6. [Forms & Controlled Input Mechanics](#6-forms--controlled-input-mechanics)
7. [Study Timer & Streak Engine Logic](#7-study-timer--streak-engine-logic)
8. [Demonstration Scope & Honest Limitations](#8-demonstration-scope--honest-limitations)
9. [Comprehensive Viva Questions & Model Answers](#9-comprehensive-viva-questions--model-answers)
10. [Step-by-Step Learning Plan](#10-step-by-step-learning-plan)

---

## 1. Project Overview & Purpose

### What is Acaderix?
Acaderix is an academic portal designed for college students and faculty members. It provides role-segregated workspaces:
- **Student Portal:** Allows students to view enrolled semester subjects, inspect topic-level syllabus breakdowns, track real-time study hours using an active focus timer, record consecutive daily study streaks, manage revision checklists using Redux Toolkit, and download sample academic resources.
- **Faculty Portal:** Allows teachers to review course subjects, author structured learning modules, and simulate coursework assignment distributions.

### Evaluation Criteria Demonstrated:
1. **React Router DOM:** Nested layouts (`<Outlet />`), dynamic parameters (`:subjectId`), route guards, and 404 handling.
2. **Context API:** Global domain state (`AuthContext` for temporary user session; `SubjectContext` for courses catalog and progress calculation).
3. **Redux Toolkit:** Predictable action-based state management for revision tasks (`addTask`, `toggleTaskComplete`, `removeTask`).
4. **React Forms & Validation:** Controlled form inputs, real-time error handling, and strict format regex guards (`^S-.+` for students, `^T-.+` for teachers).
5. **Authentic Student UI:** Clean, practical, student-built interface with readable fonts, navy/indigo styling, standard tables, and no AI-generated marketing clutter.

---

## 2. Complete Directory & File Map

```text
Acaderix/
├── index.html                  # HTML skeleton where React mounts into the browser DOM
├── package.json                # Project dependencies, scripts, and build metadata
├── vite.config.js              # Vite bundler configuration
├── PROJECT_GUIDE.md            # This complete project and viva study guide
└── src/
    ├── main.jsx                # JavaScript entry point (creates React root & mounts tree)
    ├── App.jsx                 # Top-level Router configuration defining URL routes
    ├── index.css               # Clean student-built styling (standard cards, buttons, nav)
    │
    ├── context/                # Context API providers (shared application state)
    │   ├── AuthContext.jsx     # Current user profile, role, and in-memory login/logout
    │   └── SubjectContext.jsx  # Shared courses, credit hours, and topic completion progress
    │
    ├── redux/                  # Redux Toolkit state container
    │   ├── store.js            # Configures central Redux store
    │   └── revisionSlice.js    # Slice managing revision tasks (add, toggle, remove, filter)
    │
    ├── components/
    │   ├── common/             # Reusable UI widgets
    │   │   ├── FormField.jsx   # Controlled form input displaying labels and validation errors
    │   │   ├── NotificationModal.jsx      # Modal showing teacher assignment notification
    │   │   ├── StreakInfoModal.jsx        # Modal explaining the study streak tracking algorithm
    │   │   └── StateArchitectureModal.jsx # Explainer of Context vs Redux vs useState
    │   │
    │   ├── layout/             # Structural shell wrappers
    │   │   ├── Navbar.jsx      # Top navigation bar (branding, greeting, badge 1, logout)
    │   │   ├── StudentLayout.jsx # Student layout: Banner + dark navy sidebar + <Outlet />
    │   │   └── TeacherLayout.jsx # Faculty layout: Banner + dark navy sidebar + <Outlet />
    │   │
    │   └── routes/             # Navigation guards
    │       ├── ProtectedRoute.jsx # Blocks unauthenticated users, redirects to "/"
    │       └── RoleRoute.jsx      # Prevents student from teacher pages and vice-versa
    │
    ├── pages/                  # Page components mapped to route URLs
    │   ├── WelcomePage.jsx     # Landing screen: Project details on left, Role choice on right
    │   ├── StudentRegistration.jsx # Student form: S- roll number validation
    │   ├── TeacherRegistration.jsx # Faculty form: T- teacher ID validation
    │   ├── NotFoundPage.jsx    # 404 page for invalid URLs
    │   │
    │   ├── student/            # Student workspace pages
    │   │   ├── StudentDashboard.jsx     # Focus timer, streak display, quick subjects
    │   │   ├── StudentSubjects.jsx      # Subjects catalog, search filter, add subject
    │   │   ├── StudentSubjectDetail.jsx # Dynamic route (/student/subjects/:subjectId)
    │   │   ├── StudentRevision.jsx      # Revision tasks planner (powered by Redux)
    │   │   └── StudentResources.jsx     # Academic lecture notes and lab guides
    │   │
    │   └── teacher/            # Teacher workspace pages
    │       ├── TeacherDashboard.jsx     # Faculty metrics, profile bar, modules table
    │       ├── TeacherModules.jsx       # Create module form & "Assign Module" action
    │       └── TeacherProfile.jsx       # Faculty details & academic limitations notes
    │
    └── utils/                  # Pure utility helper functions
        ├── timeGreeting.js     # Calculates time-appropriate greeting from local hour
        └── streakTracker.js    # Compares calendar dates (YYYY-MM-DD) for study streaks
```

---

## 3. Application Startup Flow

When you run `npm run dev` and open `http://localhost:5173/`:

1. **`index.html` loads first:**  
   The browser receives the static HTML containing:
   ```html
   <div id="root"></div>
   <script type="module" src="/src/main.jsx"></script>
   ```
2. **`src/main.jsx` runs:**  
   React imports `createRoot` from `react-dom/client`, targets the element `#root`, and wraps the application with our global state providers:
   ```jsx
   createRoot(document.getElementById('root')).render(
     <StrictMode>
       <Provider store={store}>          {/* 1. Redux Store */}
         <AuthProvider>                  {/* 2. Authentication Context */}
           <SubjectProvider>              {/* 3. Academic Subjects Context */}
             <App />                      {/* 4. Main Router */}
           </SubjectProvider>
         </AuthProvider>
       </Provider>
     </StrictMode>
   );
   ```
3. **`src/App.jsx` evaluates the URL:**  
   `BrowserRouter` checks the path. On the first launch, the path is `/`, which renders `<WelcomePage />`.

---

## 4. State Architecture Matrix

| State Method | Where Used in Acaderix | Lifecycle | Why This Was Chosen |
| :--- | :--- | :--- | :--- |
| **Local `useState`** | • Form field inputs & error messages<br>• Focus timer seconds & running state<br>• Modal visibility booleans (`isOpen`) | Component-level (dies when component unmounts) | **Prevents unnecessary re-renders:** A keystroke in a form input should not re-render the sidebar or navbar. |
| **Context API (`AuthContext`)** | • `currentUser` object (`role`, `fullName`, `rollNumber` / `teacherId`)<br>• `loginProfile()` and `logout()` | In-memory session (resets naturally on page refresh) | **Avoids prop-drilling:** User identity is needed across Navbar, Sidebar, Greetings, and Route Guards throughout the component tree. |
| **Context API (`SubjectContext`)** | • Shared courses array (`id`, `code`, `name`, `topics`, `progress`)<br>• `addSubject()`, `removeSubject()`, `toggleTopicCompletion()` | In-memory & local fallback | Centralizes course curriculum so both Student Subjects and Dynamic Detail pages stay synchronized. |
| **Redux Toolkit (`revisionSlice`)** | • Revision task items array<br>• `filter` state (`all`, `pending`, `completed`)<br>• Reducers: `addTask`, `toggleTaskComplete`, `removeTask`, `setFilter` | Centralized Redux Store | **Demonstrates predictable state transitions:** RTK actions cleanly model discrete operations (Add, Toggle, Delete) with an immutable reducer pattern. |

---

## 5. Routing & Navigation Architecture

### Route Hierarchy Defined in `App.jsx`:
```text
/                          --> WelcomePage (Public Role Selection)
/register/student          --> StudentRegistration (Public Form)
/register/teacher          --> TeacherRegistration (Public Form)

/student                   --> ProtectedRoute -> RoleRoute (student) -> StudentLayout
  ├── /student (index)     --> StudentDashboard
  ├── /student/subjects    --> StudentSubjects
  ├── /student/subjects/:subjectId --> StudentSubjectDetail (Dynamic Route)
  ├── /student/revision    --> StudentRevision (Redux)
  └── /student/resources   --> StudentResources

/teacher                   --> ProtectedRoute -> RoleRoute (teacher) -> TeacherLayout
  ├── /teacher (index)     --> TeacherDashboard
  ├── /teacher/modules     --> TeacherModules
  └── /teacher/profile     --> TeacherProfile

*                          --> NotFoundPage (404 Fallback)
```

### Route Guards Explained:
1. **`ProtectedRoute`:**
   ```jsx
   if (!isAuthenticated) {
     return <Navigate to="/" replace />;
   }
   ```
   If no user is logged into React memory, visiting `/student` or `/teacher` immediately redirects to `/`.
2. **`RoleRoute`:**
   ```jsx
   if (role !== allowedRole) {
     const destination = role === 'teacher' ? '/teacher' : '/student';
     return <Navigate to={destination} replace />;
   }
   ```
   If a registered Student types `/teacher` into their address bar, `RoleRoute` intercepts and redirects them back to `/student`.

---

## 6. Forms & Controlled Input Mechanics

### Reusable Input: `FormField.jsx`
All forms use our controlled wrapper [FormField.jsx](file:///c:/Users/Smark%20Singh/Acaderix/src/components/common/FormField.jsx). It accepts `label`, `value`, `onChange`, `onBlur`, and `error`. If `error` is present, it renders with an error class and an alert message.

### Student Roll Number Validation Rule:
- **Requirement:** Must start with prefix `S-` followed by an identifier.
- **Regex:** `/^S-.+$/i`
- **Validation Logic in `StudentRegistration.jsx`:**
  ```javascript
  if (!trimmedVal) {
    error = 'Roll number is required.';
  } else if (!/^S-.+$/i.test(trimmedVal)) {
    error = 'Roll number must begin with "S-" followed by an identifier (e.g. S-101 or S-2024-CSE).';
  }
  ```
  Entering `101` or `S-` without characters after the dash is rejected.

### Teacher ID Validation Rule:
- **Requirement:** Must start with prefix `T-` followed by an identifier.
- **Regex:** `/^T-.+$/i` (e.g., `T-8842`).

---

## 7. Study Timer & Streak Engine Logic

### How the Timer Works:
In [StudentDashboard.jsx](file:///c:/Users/Smark%20Singh/Acaderix/src/pages/student/StudentDashboard.jsx):
- Uses `useState` for `timerSeconds` and `isTimerRunning`.
- When `isTimerRunning` is `true`, a `useEffect` starts an active JavaScript `setInterval` ticking every 1000ms:
  ```javascript
  timerRef.current = setInterval(() => {
    setTimerSeconds((prev) => prev + 1);
  }, 1000);
  ```
- Clicking **"Pause"** clears the interval.
- Clicking **"Save Session"** calls `recordStudySession(timerSeconds)` in [streakTracker.js](file:///c:/Users/Smark%20Singh/Acaderix/src/utils/streakTracker.js).

### How the Streak is Calculated:
1. When a session is saved, Acaderix gets today’s local date string (`YYYY-MM-DD`).
2. It compares today with `lastStudyDate`:
   - If `lastStudyDate === yesterday`: Consecutive day! Streak increases by `+1`.
   - If `lastStudyDate === today`: Already studied today. Streak count is preserved without false increments.
   - If `lastStudyDate` was older than yesterday: Streak resets to `1` (starting a fresh streak).
3. The tracking logic can be inspected live in the dashboard by clicking the streak card.

---

## 8. Demonstration Scope & Honest Limitations

In college evaluations, examiners respect students who understand system boundaries. Here is the exact technical scope of Acaderix:

1. **Authentication:**
   - *Implementation:* In-memory session via React Context API (`AuthContext`).
   - *Limitation:* Resets upon full browser refresh. Does not store real password hashes or talk to a backend authentication database.
2. **Teacher Module Assignment:**
   - *Implementation:* Clicking *"Assign Module"* opens a responsive modal confirming the action.
   - *Limitation:* Does not broadcast across different computers because there is no live WebSocket or shared cloud database.
3. **Notification Badge (showing 1):**
   - *Implementation:* Renders in the navbar and dashboard to demonstrate sample teacher-to-student notice delivery.

---

## 9. Comprehensive Viva Questions & Model Answers

### Q1: What is the difference between a controlled component and an uncontrolled component in React?
> **Answer:**  
> "A controlled component has its form data handled by React state (`useState`). The `<input>` element receives its value through a `value` prop and notifies React of changes via an `onChange` callback. An uncontrolled component stores its own state internally in the DOM, accessed via a `ref`. In Acaderix, all inputs are controlled so we can validate field values on every keystroke and block invalid submissions."

### Q2: What is the difference between React Context API and Redux Toolkit? Why did you use both?
> **Answer:**  
> "React Context API is built into React and is designed for low-frequency global state that needs to be accessed by many components without prop-drilling (like our `AuthContext` for the logged-in user). Redux Toolkit is an external state management library that uses a strict unidirectional data flow with action creators and reducers. We used Redux Toolkit for our revision planner (`revisionSlice`) because task management involves discrete, frequent mutations (Add, Toggle, Delete, Filter) where a centralized store with predictable reducers is ideal."

### Q3: What is the purpose of the `<Outlet />` component in React Router?
> **Answer:**  
> "`<Outlet />` is a placeholder component provided by React Router DOM. It renders the matching child route inside a parent layout. In Acaderix, `StudentLayout` defines the persistent top navbar and sidebar once, and `<Outlet />` dynamically renders `StudentDashboard`, `StudentSubjects`, or `StudentRevision` depending on the current URL."

### Q4: How does dynamic routing work in Acaderix?
> **Answer:**  
> "In `App.jsx`, we defined `<Route path='subjects/:subjectId' element={<StudentSubjectDetail />} />`. When a student clicks on a course (like CS-201), the URL becomes `/student/subjects/cs-201`. In `StudentSubjectDetail.jsx`, we call the `useParams()` hook from React Router to read `subjectId`, then query our `SubjectContext` to retrieve and display that exact subject's topics."

### Q5: Why did you wrap `main.jsx` with `<StrictMode>`? Why do console logs sometimes appear twice in development?
> **Answer:**  
> "`<StrictMode>` is a development-only tool in React that highlights potential bugs, deprecated lifecycles, and unintended side effects. In development mode, React intentionally mounts components twice to verify that effects clean up properly. It has zero impact on the production build."

### Q6: How is the time-based greeting generated?
> **Answer:**  
> "In `src/utils/timeGreeting.js`, we read `new Date().getHours()` from the user's local system time. If the hour is under 12, it returns 'Good morning'; if between 12 and 17, 'Good afternoon'; otherwise, 'Good evening'. It combines this greeting with the user's actual registered name from `AuthContext`."

---

## 10. Step-by-Step Learning Plan

To master this project completely, we will progress through these 6 learning modules:

```text
[Module 1] React Fundamentals & Startup Chain
           index.html -> main.jsx -> Providers -> App.jsx -> Virtual DOM

[Module 2] Forms, Controlled Inputs & Regex Validation
           FormField.jsx, useState, touched, regex rules (^S-.+ / ^T-.+)

[Module 3] React Router DOM & Layout Architecture
           BrowserRouter, Routes, Route, NavLink, Outlet, useParams, Guards

[Module 4] Context API Deep Dive
           createContext, Provider, useContext, AuthContext, SubjectContext

[Module 5] Redux Toolkit (RTK) Mechanics
           configureStore, createSlice, useSelector, useDispatch, reducers

[Module 6] Mock Viva & Code Defense
           Explaining lines of code under examination, debugging scenarios
```
