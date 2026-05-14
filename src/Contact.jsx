import React from "react";
import Navbar from "./nav";

const Contact = () => {
  const courseContacts = [
    { name: "mpraghul", whatsapp: "7550369276", insta: "mpr0.4", message: "Hello mpraghul, I have a doubt regarding the Course." }
  ];

  const websiteContacts = [
    { name: "manekandan", whatsapp: "9042435709", insta: "bull_city", message: "Hello manekandan, I have a doubt regarding the Website." },
    { name: "valesh", whatsapp: "8807099276", insta: "mpv._.15", message: "Hello valesh, I have a doubt regarding the Website." }
  ];

  const ContactCard = ({ title, contacts, icon }) => (
    <div style={{
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(20px)",
      borderRadius: "30px",
      padding: "40px",
      border: "1px solid rgba(170, 124, 17, 0.2)",
      boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
      flex: 1,
      minWidth: "350px",
      animation: "fadeIn 0.5s ease"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
        <span style={{ fontSize: "30px" }}>{icon}</span>
        <h2 style={{ fontSize: "24px", color: "#110b09", margin: 0 }}>{title}</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        {contacts.map((c, i) => (
          <div key={i} style={{ 
            padding: "20px", 
            background: "white", 
            borderRadius: "20px",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.02)"
          }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#AA7C11", fontSize: "18px", textTransform: "capitalize" }}>{c.name}</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#444" }}>
                <span style={{ color: "#25D366", fontSize: "18px", fontWeight: "bold" }}>WhatsApp:</span>
                <a 
                  href={`https://wa.me/91${c.whatsapp}?text=${encodeURIComponent(c.message)}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#110b09", fontWeight: "bold", textDecoration: "none", borderBottom: "1px dashed #AA7C11" }}
                >
                  {c.whatsapp}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#444" }}>
                <span style={{ color: "#E1306C", fontSize: "18px", fontWeight: "bold" }}>Instagram:</span>
                <a 
                  href={`https://instagram.com/${c.insta}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#110b09", fontWeight: "bold", textDecoration: "none", borderBottom: "1px dashed #AA7C11" }}
                >
                  @{c.insta}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ 
      backgroundColor: "#FDFBF7", 
      minHeight: "100vh", 
      color: "#110b09", 
      fontFamily: "'Inter', sans-serif",
      backgroundImage: `url('/back.jpg')`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundBlendMode: "overlay"
    }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 20px" }}>
        <header style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#110b09", marginBottom: "15px" }}>Help & Support</h1>
          <p style={{ color: "#666", fontSize: "18px" }}>Have a doubt? Click the links below to message us directly.</p>
        </header>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "center" }}>
          <ContactCard title="Doubts in Course" contacts={courseContacts} icon="📚" />
          <ContactCard title="Doubts in Website" contacts={websiteContacts} icon="🌐" />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Contact;
