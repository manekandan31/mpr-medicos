import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Home from "./home";
import Login from "./Login";
import Course from "./course";
import AIHelp from "./AIHelp";
import Contact from "./Contact";

// A wrapper for protected routes
// ... (rest of ProtectedRoute remains same)
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes (require login) */}
          <Route path="/course" element={<ProtectedRoute><Course /></ProtectedRoute>} />
          <Route path="/ai-help" element={<ProtectedRoute><AIHelp /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;