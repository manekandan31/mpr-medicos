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

// Dummy component for protected pages so they don't crash
const DummyProtectedPage = ({ title }) => {
  return (
    <div style={{ backgroundColor: "#FDFBF7", minHeight: "100vh", color: "#110b09", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ color: "#AA7C11" }}>{title} Page (Coming Soon)</h1>
    </div>
  );
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