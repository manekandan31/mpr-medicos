import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const [hoverLink, setHoverLink] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Course", path: "/course" },
    { name: "AI Help", path: "/ai-help" },
    { name: "Contact", path: "/contact" }
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav style={{
      background: "rgba(255, 255, 255, 0.95)",
      padding: isMobile ? "10px 20px" : "10px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 15px rgba(0, 0, 0, 0.05)",
      backdropFilter: "blur(10px)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      borderBottom: "1px solid rgba(0,0,0,0.05)"
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="MPR Medicos" style={{
          width: isMobile ? "90px" : "120px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(48, 43, 99, 0.2)",
        }} />
      </Link>

      {/* Mobile Toggle */}
      {isMobile ? (
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#AA7C11" }}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      ) : (
        /* Desktop Menu */
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <ul style={{ display: "flex", listStyle: "none", gap: "30px", margin: 0, padding: 0 }}>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  style={{
                    ...linkStyle,
                    ...(hoverLink === item.name || location.pathname === item.path ? linkHoverStyle : {}),
                  }}
                  onMouseEnter={() => setHoverLink(item.name)}
                  onMouseLeave={() => setHoverLink(null)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ color: "#AA7C11", fontSize: "14px", fontWeight: "bold" }}>{user.type}</span>
              <button onClick={handleLogout} style={secondaryButtonStyle}>Logout</button>
            </div>
          ) : (
            <Link to="/login"><button style={primaryButtonStyle}>Login</button></Link>
          )}
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "white", padding: "20px", borderTop: "1px solid #eee",
          display: "flex", flexDirection: "column", gap: "20px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          animation: "slideDown 0.3s ease"
        }}>
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ ...linkStyle, color: location.pathname === item.path ? "#AA7C11" : "#333", fontSize: "18px" }}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} style={{...secondaryButtonStyle, width: "100%"}}>Logout</button>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}><button style={{...primaryButtonStyle, width: "100%"}}>Login</button></Link>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </nav>
  );
};

const linkStyle = { color: "#333", textDecoration: "none", fontSize: "16px", fontWeight: "600", transition: "all 0.3s ease" };
const linkHoverStyle = { color: "#AA7C11" };
const primaryButtonStyle = {
  background: "linear-gradient(90deg, #D4AF37, #AA7C11)", color: "#110b09", border: "none",
  padding: "10px 25px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer"
};
const secondaryButtonStyle = {
  background: "transparent", color: "#333", border: "1px solid #AA7C11",
  padding: "8px 20px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer"
};

export default Navbar;