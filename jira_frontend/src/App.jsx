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
        <Route path="/dashboard" element={<h1>Welcome to Dashboard 🎉</h1>} />

        {/* Fallback route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
