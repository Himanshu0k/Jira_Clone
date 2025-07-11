// import './App.css'
// import { Register } from './components/auth/Register'
// import { Login } from './components/auth/Login'

// function App() {

//   return (
//     <div >
//       {/* <h1 className='text-3xl font-bold underline'>JIRA Application</h1> */}
//       <Login />
//     </div> 
//   )
// }

// export default App

import './App.css';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { OAuth2RedirectHandler } from './components/OAuth2RedirectHandler';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminDashboard } from './components/pages/AdminDashboard';
import CreateProject from './components/pages/routedPages/CreateProject';
import CreateIssue from './components/pages/routedPages/CreateIssue';
import AssignIssue from './components/pages/routedPages/AssignIssue';
import ViewIssues from './components/pages/routedPages/ViewIssues';
import { ManagerDashboard } from './components/pages/ManagerDashboard';

// import { div } from 'framer-motion/client';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* OAuth2 success redirect handler */}
        <Route path="/oauth2-success" element={<OAuth2RedirectHandler />} />

        {/* Example dashboard route after login */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/manager-dashboard" element={<ManagerDashboard />} />

        <Route path="/create-project" element={<CreateProject />} />

        <Route path="/create-issue" element={<CreateIssue />} />

        <Route path="/assign-issue" element={<AssignIssue />} />

        <Route path="/view-issues" element={<ViewIssues />} />

        {/* Fallback route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
