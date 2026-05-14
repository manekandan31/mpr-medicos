import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./nav";
import { useAuth } from "./AuthContext";
import API_URL from "./apiConfig";

const Login = () => {
  const [loginType, setLoginType] = useState("student"); // 'student' or 'admin'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (loginType === "admin") {
      // Hardcoded Admin Credentials
      if (username === "admin" && password === "admin123") {
        login({ type: "admin", username: "admin" });
        navigate("/"); 
      } else {
        setError("Invalid admin username or password.");
      }
    } else {
      // Student Login - Call Backend API
      if (username && password) {
        try {
          const response = await fetch(`${API_URL}/api/login/student/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: username, password: password }),
          });

          const data = await response.json();

          if (response.ok) {
            login({ type: "student", email: username });
            navigate("/");
          } else {
            setError(data.error || "Login failed. Please try again.");
          }
        } catch (err) {
          setError("Server connection error. Is the backend running?");
        }
      } else {
        setError("Please enter your email and password.");
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#110b09", minHeight: "100vh", color: "#FDFBF7", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: "80px 20px",
        background: "radial-gradient(circle at 50% 0%, #2C1E16 0%, #110b09 70%)"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "50px",
          width: "100%",
          maxWidth: "450px",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}>
          
          <h2 style={{ textAlign: "center", fontSize: "32px", color: "#D4AF37", marginBottom: "30px" }}>
            Welcome Back
          </h2>

          {/* Toggle Switch */}
          <div style={{
            display: "flex",
            background: "rgba(0,0,0,0.4)",
            borderRadius: "30px",
            padding: "5px",
            marginBottom: "40px",
            border: "1px solid rgba(212, 175, 55, 0.1)"
          }}>
            <button 
              onClick={() => setLoginType("student")}
              style={{
                flex: 1,
                padding: "12px 20px",
                borderRadius: "25px",
                border: "none",
                background: loginType === "student" ? "linear-gradient(90deg, #D4AF37, #AA7C11)" : "transparent",
                color: loginType === "student" ? "#110b09" : "#E2D8D0",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              Student
            </button>
            <button 
              onClick={() => setLoginType("admin")}
              style={{
                flex: 1,
                padding: "12px 20px",
                borderRadius: "25px",
                border: "none",
                background: loginType === "admin" ? "linear-gradient(90deg, #D4AF37, #AA7C11)" : "transparent",
                color: loginType === "admin" ? "#110b09" : "#E2D8D0",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {error && (
              <div style={{ color: "#ff4d4d", background: "rgba(255, 77, 77, 0.1)", padding: "10px", borderRadius: "8px", fontSize: "14px", textAlign: "center" }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "14px", color: "#E2D8D0", marginBottom: "8px" }}>
                {loginType === "admin" ? "Admin Username" : "Email Address"}
              </label>
              <input 
                type={loginType === "admin" ? "text" : "email"}
                placeholder={loginType === "admin" ? "Enter admin username" : "Enter your email"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "12px",
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  outline: "none",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            
            <div>
              <label style={{ display: "block", fontSize: "14px", color: "#E2D8D0", marginBottom: "8px" }}>Password</label>
              <input 
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "12px",
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  outline: "none",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", color: "#E2D8D0" }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={{ color: "#D4AF37", textDecoration: "none" }}>Forgot Password?</a>
            </div>

            <button 
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                marginTop: "10px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(90deg, #D4AF37, #AA7C11)",
                color: "#110b09",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 5px 15px rgba(212, 175, 55, 0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              Sign In as {loginType === "student" ? "Student" : "Admin"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
