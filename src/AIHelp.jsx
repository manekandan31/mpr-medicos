import React, { useState, useRef, useEffect } from "react";
import Navbar from "./nav";
import ReactMarkdown from 'react-markdown';
import API_URL from "./apiConfig";

const AIHelp = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "### Welcome to MPR Medicos AI\nI am your clinical assistant. How can I help you with your **Medical Studies** today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const chatEndRef = useRef(null);
  const imageInputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textOverride = null) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() && !selectedImage) return;

    setMessages(prev => [...prev, { role: "user", content: textToSend, image: imagePreview }]);
    setInput("");
    const imgToSend = selectedImage;
    setSelectedImage(null);
    setImagePreview(null);
    setLoading(true);

    // Show "waking up" message after 6 seconds (Render cold start)
    const wakingTimer = setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "⏳ The AI server is waking up (Render free tier sleeps after inactivity). Please wait 30-60 seconds..." 
      }]);
    }, 6000);

    try {
      const formData = new FormData();
      formData.append("message", textToSend || "");
      if (imgToSend) formData.append("image", imgToSend);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 min timeout

      const response = await fetch(`${API_URL}/api/ai/chat/`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      clearTimeout(wakingTimer);
      // Remove "waking up" message if it appeared
      setMessages(prev => prev.filter(m => !m.content.includes("waking up")));
      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      clearTimeout(wakingTimer);
      setMessages(prev => prev.filter(m => !m.content.includes("waking up")));
      if (err.name === 'AbortError') {
        setMessages(prev => [...prev, { role: "assistant", content: "⚠️ The request timed out. The server may still be starting. Please try again in a moment." }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "❌ Could not connect to AI server. Please try sending your message again." }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice not supported.");
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e) => handleSend(e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div style={{ backgroundColor: "#FDFBF7", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flex: 1, width: "100%", maxWidth: "1000px", margin: "0 auto", padding: isMobile ? "0" : "15px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ 
          background: "rgba(255, 255, 255, 0.95)", 
          borderRadius: isMobile ? "0" : "25px", 
          flex: 1,
          display: "flex", 
          flexDirection: "column",
          boxShadow: isMobile ? "none" : "0 10px 40px rgba(0,0,0,0.05)",
          overflow: "hidden",
          border: isMobile ? "none" : "1px solid #eee"
        }}>
          {/* AI Header */}
          <div style={{ padding: "12px 20px", borderBottom: "1px solid #eee", background: "white", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #D4AF37, #AA7C11)", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>🩺</div>
            <h3 style={{ fontSize: "16px", margin: 0 }}>MPR Clinical AI</h3>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "#fafafa" }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: m.role === "user" ? "flex-end" : "flex-start"
              }}>
                <div style={{
                  padding: "12px 16px",
                  borderRadius: "18px",
                  background: m.role === "user" ? "#AA7C11" : "white",
                  color: m.role === "user" ? "white" : "#333",
                  fontSize: "14px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  lineHeight: "1.5"
                }}>
                  {m.image && <img src={m.image} alt="upload" style={{maxWidth: "100%", maxHeight: "150px", borderRadius: "8px", marginBottom: "8px", display: "block"}} />}
                  {m.role === "assistant" ? <ReactMarkdown>{m.content}</ReactMarkdown> : m.content}
                </div>
                <span style={{ fontSize: "9px", color: "#999", marginTop: "4px", fontWeight: "bold" }}>{m.role.toUpperCase()}</span>
              </div>
            ))}
            {loading && <div style={{ color: "#AA7C11", fontSize: "12px" }}>AI is thinking...</div>}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area - RE-ENGINEERED FOR MOBILE */}
          <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            {imagePreview && (
              <div style={{padding: "10px 20px", background: "#f9f9f9", display: "flex", alignItems: "center", gap: "10px", borderTop: "1px solid #eee"}}>
                 <img src={imagePreview} alt="preview" style={{height: "40px", borderRadius: "5px"}} />
                 <span style={{fontSize: "12px", color: "#666"}}>{selectedImage?.name}</span>
                 <button onClick={() => {setSelectedImage(null); setImagePreview(null);}} style={{background: "none", border: "none", color: "#ff4444", cursor: "pointer", fontWeight: "bold", marginLeft: "auto"}}>✕</button>
              </div>
            )}
            <div style={{ 
              padding: "10px 12px", 
              background: "white", 
              borderTop: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: "6px"
          }}>
            <button onClick={() => imageInputRef.current.click()} style={smallIconStyle}>🖼️</button>
            <button onClick={startListening} style={{...smallIconStyle, background: isListening ? "#ff4444" : "transparent"}}>{isListening ? "🛑" : "🎤"}</button>
            
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask query..."
              style={{ 
                flex: 1, 
                minWidth: "0", 
                padding: "10px 14px", 
                borderRadius: "20px", 
                border: "1px solid #ddd", 
                outline: "none", 
                fontSize: "14px" 
              }}
            />

            <button 
              onClick={() => handleSend()} 
              style={{ 
                background: "#AA7C11", 
                color: "white", 
                border: "none", 
                padding: "10px 14px", 
                borderRadius: "18px", 
                fontWeight: "bold", 
                fontSize: "14px",
                flexShrink: 0,
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

      <input 
        type="file" 
        accept="image/*" 
        ref={imageInputRef} 
        style={{ display: "none" }} 
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
          }
          e.target.value = null;
        }} 
      />
      <style>{`.markdown-content p { margin: 0; }`}</style>
    </div>
  );
};

const smallIconStyle = {
  background: "transparent", border: "1px solid #ddd", borderRadius: "50%",
  width: "36px", height: "36px", display: "flex", justifyContent: "center", alignItems: "center",
  cursor: "pointer", fontSize: "18px", flexShrink: 0
};

export default AIHelp;
