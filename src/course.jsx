import React, { useState, useRef, useEffect } from "react";
import Navbar from "./nav";
import { useAuth } from "./AuthContext";
import API_URL from "./apiConfig";

const Course = () => {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [viewMode, setViewMode] = useState("list"); 
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const [topicVideo, setTopicVideo] = useState(null);
  const [topicPdf, setTopicPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const videoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const topicEmojis = {
    "Introduction": "📖", "Medical Ethics": "⚖️", "Identification": "🆔", "Forensic Pathology": "🔬",
    "Injuries": "🩹", "Asphyxia": "🫁", "Forensic OBG": "🤰", "Toxicology": "🧪", "Forensic Psychiatry": "🧠",
    "Concept of Health and Disease": "🏥", "Epidemiology": "📊", "Biostatistics": "🔢",
    "Demography and Family Health": "👨‍👩‍👧‍👦", "Nutrition and Health": "🍎", "Environmental Health": "🌍",
    "Communicable Disease": "🦠", "Non-Communicable Disease": "🚬", "National Health Programs": "🇮🇳",
    "Health Systems in India": "⚕️", "Maternal and Child Care": "🤱", "Health Education and Communication": "📢",
    "Occupational Health": "🏭", "Disaster Management": "🆘"
  };

  const courses = [
    {
      id: "community",
      title: "Community Medicine",
      image: "/community.jpg",
      orderedTopics: [
        "Concept of Health and Disease", "Epidemiology", "Biostatistics", "Demography and Family Health",
        "Nutrition and Health", "Environmental Health", "Communicable Disease", "Non-Communicable Disease",
        "National Health Programs", "Health Systems in India", "Maternal and Child Care",
        "Health Education and Communication", "Occupational Health", "Disaster Management"
      ],
      topics: {
        high: ["Epidemiology", "Biostatistics", "Communicable Disease", "Non-Communicable Disease", "Maternal and Child Care", "National Health Programs"],
        moderate: ["Concept of Health and Disease", "Demography and Family Health", "Nutrition and Health", "Environmental Health", "Health Systems in India", "Health Education and Communication"],
        rare: ["Occupational Health", "Disaster Management"]
      }
    },
    {
      id: "forensic",
      title: "Forensic Medicine",
      image: "/forensic.jpg",
      orderedTopics: [
        "Introduction", "Medical Ethics", "Identification", "Forensic Pathology", "Injuries",
        "Asphyxia", "Forensic OBG", "Toxicology", "Forensic Psychiatry"
      ],
      topics: {
        high: ["Medical Ethics", "Identification", "Injuries", "Asphyxia", "Toxicology"],
        moderate: ["Forensic Pathology", "Forensic OBG", "Forensic Psychiatry"],
        rare: ["Introduction"]
      }
    }
  ];

  const isAdmin = user?.type === "admin";

  useEffect(() => {
    if (selectedTopic) {
      setLoading(true);
      fetch(`${API_URL}/api/topic/${selectedTopic}/`)
        .then(res => res.json())
        .then(data => {
          setTopicVideo(data.video_url);
          setTopicPdf(data.pdf_url);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [selectedTopic]);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setVideoCompleted(false);
  };

  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (file && selectedTopic) {
      const formData = new FormData();
      if (type === "Video" || type === "PDF") formData.append(type.toLowerCase(), file);
      else formData.append("exam", file);
      try {
        const response = await fetch(`${API_URL}/api/topic/${selectedTopic}/update/`, {
          method: "POST", body: formData,
        });
        const data = await response.json();
        if (type === "Video") setTopicVideo(data.video_url);
        if (type === "PDF") setTopicPdf(data.pdf_url);
        alert(`${type} updated!`);
      } catch (err) { alert("Upload failed."); }
    }
  };

  const TopicSection = ({ title, emoji, items, color }) => (
    <div style={{ marginBottom: "45px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px", position: "relative", paddingBottom: "10px" }}>
        <div style={{ width: "45px", height: "45px", borderRadius: "12px", background: `${color}15`, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px", border: `1px solid ${color}33` }}>
          {emoji}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "800", color: "#110b09", margin: 0, textTransform: "uppercase", fontFamily: "'Outfit', sans-serif" }}>{title}</h3>
          <div style={{ width: "60px", height: "4px", background: color, borderRadius: "2px", marginTop: "4px" }}></div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {items.map((item, idx) => (
          <div key={idx} onClick={() => handleTopicClick(item)} style={{ background: "white", padding: "14px 22px", borderRadius: "18px", fontSize: "15px", fontWeight: "600", border: `1px solid rgba(0,0,0,0.05)`, cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "12px", transition: "all 0.2s ease" }}>
            <span style={{ fontSize: "18px" }}>{topicEmojis[item] || "🔹"}</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#FDFBF7", minHeight: "100vh", backgroundImage: `url('/back.jpg')`, backgroundSize: "cover", backgroundAttachment: "fixed", backgroundPosition: "center", backgroundBlendMode: "overlay" }}>
      <Navbar />

      {isAdmin && (
        <>
          <input type="file" accept="video/*" ref={videoInputRef} style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "Video")} />
          <input type="file" accept=".pdf" ref={pdfInputRef} style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "PDF")} />
        </>
      )}

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "20px" : "40px 20px" }}>
        {/* Breadcrumbs / Back Navigation */}
        <div style={{ marginBottom: "25px", display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: "bold" }}>
          <button 
            onClick={() => {
              if (selectedTopic) setSelectedTopic(null);
              else if (selectedCourse) setSelectedCourse(null);
            }} 
            style={{ 
              background: "white", border: "1px solid #AA7C1133", padding: "8px 15px", borderRadius: "12px", 
              color: "#AA7C11", cursor: "pointer", display: (selectedCourse || selectedTopic) ? "flex" : "none", 
              alignItems: "center", gap: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" 
            }}
          >
            ← {selectedTopic ? "Back to Curriculum" : "Back to Courses"}
          </button>
        </div>

        {!selectedCourse ? (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <h1 style={{ textAlign: "center", fontSize: isMobile ? "34px" : "48px", fontWeight: "900", marginBottom: "60px", fontFamily: "'Outfit', sans-serif" }}>Choose Specialization</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: isMobile ? "30px" : "60px" }}>
              {courses.map((course) => (
                <div key={course.id} onClick={() => {setSelectedCourse(course); setViewMode("list");}} style={{
                  textAlign: "center", width: isMobile ? "100%" : "380px", padding: "50px 40px", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)", borderRadius: "40px", border: "1px solid rgba(170, 124, 17, 0.2)", cursor: "pointer"
                }}>
                  <img src={course.image} alt={course.title} style={{ width: "220px", height: "220px", borderRadius: "50%", border: "5px solid #AA7C11", objectFit: "cover", marginBottom: "30px", boxShadow: "0 10px 30px rgba(170, 124, 17, 0.3)" }} />
                  <h2 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "20px" }}>{course.title}</h2>
                  <button style={{ background: "linear-gradient(90deg, #D4AF37, #AA7C11)", color: "#110b09", border: "none", padding: "14px 35px", borderRadius: "30px", fontWeight: "900" }}>Explore Now</button>
                </div>
              ))}
            </div>
          </div>
        ) : !selectedTopic ? (
          <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(25px)", borderRadius: "35px", padding: isMobile ? "25px" : "55px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "50px" }}>
              <h1 style={{ fontSize: isMobile ? "26px" : "36px", fontWeight: "900" }}>{selectedCourse.title}</h1>
              <button onClick={() => setViewMode(viewMode === "list" ? "yield" : "list")} style={{ background: viewMode === "yield" ? "#AA7C11" : "transparent", color: viewMode === "yield" ? "white" : "#AA7C11", border: "2px solid #AA7C11", padding: "10px 28px", borderRadius: "25px", fontWeight: "800", cursor: "pointer" }}>
                {viewMode === "list" ? "🎯 YIELD VIEW" : "📋 LIST VIEW"}
              </button>
            </div>
            {viewMode === "list" ? (
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(450px, 1fr))", gap: "18px" }}>
                {selectedCourse.orderedTopics.map((topic, index) => (
                  <div key={index} onClick={() => handleTopicClick(topic)} style={{ background: "white", padding: "20px 30px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.05)", cursor: "pointer", display: "flex", alignItems: "center", gap: "20px" }}>
                    <span style={{ color: "#AA7C11", fontWeight: "900", fontSize: "20px", minWidth: "35px" }}>{index + 1}.</span>
                    <span style={{ fontSize: "22px" }}>{topicEmojis[topic]}</span>
                    <span style={{ fontSize: "18px", fontWeight: "700" }}>{topic}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <TopicSection title="High Yield" emoji="🔴" color="#d32f2f" items={selectedCourse.topics.high} />
                <TopicSection title="Moderate Yield" emoji="🟠" color="#f57c00" items={selectedCourse.topics.moderate} />
                <TopicSection title="Rare" emoji="🟡" color="#fbc02d" items={selectedCourse.topics.rare} />
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(30px)", borderRadius: "40px", padding: isMobile ? "25px" : "50px", border: "1px solid rgba(170, 124, 17, 0.1)" }}>
            <h1 style={{ fontSize: isMobile ? "24px" : "38px", fontWeight: "900", marginBottom: "40px" }}>{topicEmojis[selectedTopic]} {selectedTopic}</h1>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "50px" }}>
              <div style={{ flex: 2 }}>
                <div style={{ position: "relative", background: "#000", borderRadius: "30px", overflow: "hidden", aspectRatio: "16/9" }}>
                  {topicVideo ? <video controls style={{ width: "100%", height: "100%" }} src={topicVideo} /> : <div style={{ color: "white", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>Video Loading...</div>}
                  {isAdmin && <button onClick={() => videoInputRef.current.click()} style={{ position: "absolute", top: "20px", right: "20px", padding: "10px 20px", background: "#AA7C11", color: "white", border: "none", borderRadius: "15px", fontWeight: "bold" }}>Edit Video</button>}
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "30px" }}>
                <div style={{ background: "white", padding: "30px", borderRadius: "25px", border: "1px solid rgba(0,0,0,0.05)", opacity: (videoCompleted || isAdmin) ? 1 : 0.6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}><h4 style={{ margin: 0 }}>📚 Study Notes</h4>{isAdmin && <button onClick={() => pdfInputRef.current.click()} style={{ border: "none", background: "none", color: "#AA7C11", fontWeight: "900" }}>EDIT</button>}</div>
                  <button onClick={() => window.open(topicPdf, "_blank")} disabled={!(videoCompleted || isAdmin) || !topicPdf} style={{ width: "100%", padding: "15px", borderRadius: "15px", border: "none", background: "linear-gradient(90deg, #D4AF37, #AA7C11)", color: "white", fontWeight: "900" }}>DOWNLOAD PDF</button>
                </div>
                <div style={{ background: "white", padding: "30px", borderRadius: "25px", border: "1px solid rgba(0,0,0,0.05)", opacity: (videoCompleted || isAdmin) ? 1 : 0.6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}><h4 style={{ margin: 0 }}>📝 Mini Test</h4>{isAdmin && <button style={{ border: "none", background: "none", color: "#AA7C11", fontWeight: "900" }}>EDIT</button>}</div>
                  <button disabled={!(videoCompleted || isAdmin)} style={{ width: "100%", padding: "15px", borderRadius: "15px", border: "none", background: "linear-gradient(90deg, #D4AF37, #AA7C11)", color: "white", fontWeight: "900" }}>TAKE TEST</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default Course;
