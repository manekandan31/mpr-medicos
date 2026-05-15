import React, { useState, useRef, useEffect } from "react";
import Navbar from "./nav";
import API_URL from "./apiConfig";
import Carousel from "./Carousel";
import { useAuth } from "./AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [videoSrc, setVideoSrc] = useState("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
  const fileInputRef = useRef(null);

  // Fetch persistent video from backend on mount
  useEffect(() => {
    fetch(`${API_URL}/api/site/video/`)
      .then(res => res.json())
      .then(data => {
        if (data.video_url) setVideoSrc(data.video_url);
      })
      .catch(err => console.error("Error fetching video:", err));
  }, []);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("video", file);

      try {
        const response = await fetch(`${API_URL}/api/site/video/update/`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          setVideoSrc(data.video_url);
        } else {
          alert(data.error || "Upload failed");
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Server error. Is the backend running?");
      }
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{ 
      backgroundColor: "#110b09", 
      minHeight: "100vh", 
      color: "#FDFBF7", 
      fontFamily: "'Inter', sans-serif",
      backgroundImage: `url('/back.jpg')`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      opacity: 1
    }}>
      <Navbar />

      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px 40px",
          background: "transparent",
        }}
      >
        <h1 style={{ 
          fontSize: "48px", 
          marginBottom: "15px", 
          fontWeight: "800",
          color: "#110b09"
        }}>
          Welcome to MPR Medicos
        </h1>

        <p style={{ fontSize: "20px", color: "#444", maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.6" }}>
          The ultimate premium platform for mastering medical education, clinical skills, and forensic law. Stay updated. Stay ahead. Crack NExT.
        </p>

        <Carousel />
      </div>

      {/* Details Section */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 20px" }}>
        <h2 style={{ fontSize: "32px", color: "#AA7C11", textAlign: "center", marginBottom: "40px" }}>Why Choose MPR Medicos?</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
          {/* Detail Card 1 */}
          <div style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "30px",
            border: "1px solid rgba(170, 124, 17, 0.2)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}>
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>🧠</div>
            <h3 style={{ fontSize: "22px", color: "#110b09", marginBottom: "10px" }}>AI-Powered Learning</h3>
            <p style={{ color: "#444", lineHeight: "1.5" }}>
              Experience state-of-the-art AI assistance that adapts to your learning pace, answering complex medical queries and helping you analyze clinical cases in real-time.
            </p>
          </div>

          {/* Detail Card 2 */}
          <div style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "30px",
            border: "1px solid rgba(170, 124, 17, 0.2)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}>
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>⚖️</div>
            <h3 style={{ fontSize: "22px", color: "#110b09", marginBottom: "10px" }}>Latest Forensic Laws</h3>
            <p style={{ color: "#444", lineHeight: "1.5" }}>
              Stay updated with the most recent changes in Indian medical and forensic laws, ensuring your clinical practice is always legally compliant and ethically sound.
            </p>
          </div>

          {/* Detail Card 3 */}
          <div style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "30px",
            border: "1px solid rgba(170, 124, 17, 0.2)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}>
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>🎯</div>
            <h3 style={{ fontSize: "22px", color: "#110b09", marginBottom: "10px" }}>Exam Focused</h3>
            <p style={{ color: "#444", lineHeight: "1.5" }}>
              High-yield content explicitly tailored for NExT, NEET PG, and FMGE. Get crisp, actionable data insights to master the most frequently tested concepts.
            </p>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div style={{ 
        maxWidth: "900px", 
        margin: "0 auto 80px", 
        padding: "0 20px",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "32px", color: "#D4AF37", marginBottom: "20px" }}>Platform Overview</h2>
        <p style={{ color: "#E2D8D0", marginBottom: "40px" }}>Watch our introductory video to see how MPR Medicos can transform your medical journey.</p>
        
        <div style={{
          position: "relative",
          paddingBottom: "56.25%", /* 16:9 Aspect Ratio */
          height: 0,
          overflow: "hidden",
          borderRadius: "20px",
          border: "2px solid rgba(212, 175, 55, 0.3)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 40px rgba(212, 175, 55, 0.1)",
          background: "#000"
        }}>
          {/* Edit Video Button - Admin Only */}
          {user?.type === "admin" && (
            <button 
              onClick={triggerFileSelect}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                zIndex: 10,
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                color: "#FDFBF7",
                border: "1px solid rgba(212, 175, 55, 0.5)",
                borderRadius: "30px",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(212, 175, 55, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
              }}
            >
              <span>✏️</span> Edit Video
            </button>
          )}

          {/* Hidden File Input */}
          <input 
            type="file" 
            accept="video/*" 
            ref={fileInputRef} 
            onChange={handleVideoUpload} 
            style={{ display: "none" }} 
          />

          <video 
            key={videoSrc}
            controls 
            crossOrigin="anonymous"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          >
            <source src={videoSrc} />
            Your browser does not support HTML video.
          </video>
        </div>
      </div>

      <div style={{ textAlign: "center", paddingBottom: "60px" }}>
        <button
          style={{
            padding: "16px 40px",
            fontSize: "18px",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #D4AF37 0%, #AA7C11 100%)",
            color: "#110b09",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            boxShadow: "0 10px 20px rgba(212, 175, 55, 0.3)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default Home;