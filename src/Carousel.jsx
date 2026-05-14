import React, { useState, useEffect, useCallback } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Drag interaction states
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const slides = [
    {
      id: 1,
      tag: "TOP UPDATE 🔥", tagColor: "#e53e3e", bgGlow: "rgba(229, 62, 62, 0.2)",
      question: "What is the most important recent change in Indian forensic law?",
      answer: "India replaced IPC, CrPC and Evidence Act with BNS, BNSS and BSA in 2024.",
      insight: "Forensic investigation is now mandatory for crimes with ≥ 7 years punishment (BNSS Section 176(3)).",
      footer: "NEXT HIGH YIELD", icon: "⚖️"
    },
    {
      id: 2,
      tag: "FORENSIC REALITY ⚖️", tagColor: "#dd6b20", bgGlow: "rgba(221, 107, 32, 0.2)",
      question: "Why are forensic reports delayed in India?",
      answer: "Due to shortage of experts and lab infrastructure.",
      insight: "40% posts are vacant in forensic labs leading to over 5 crore cases pending analysis.",
      footer: "VIVA IMPORTANT", icon: "⏳"
    },
    {
      id: 3,
      tag: "CLINICAL + LEGAL 🛡️", tagColor: "#e53e3e", bgGlow: "rgba(229, 62, 62, 0.2)",
      question: "Why is forensic medicine becoming more important now?",
      answer: "New laws mandate forensic involvement in major crimes.",
      insight: "₹1,471 crore allocated for forensic infrastructure in Union Budget 2026.",
      footer: "THEORY + APPLICATION", icon: "🔬"
    },
    {
      id: 4,
      tag: "SYSTEM GAP 👤", tagColor: "#6b46c1", bgGlow: "rgba(107, 70, 193, 0.2)",
      question: "Is there a licensing body for forensic experts in India?",
      answer: "No, India currently has no regulatory authority for forensic professionals.",
      insight: "This creates risk of unqualified experts and wrongful convictions.",
      footer: "ETHICS QUESTION", icon: "📋"
    },
    {
      id: 5,
      tag: "CAREER UPDATE 🎓", tagColor: "#6b46c1", bgGlow: "rgba(107, 70, 193, 0.2)",
      question: "What is new in FACT 2026 exam?",
      answer: "Two new domains added: Forensic Biological Sciences & Crime Scene Management.",
      insight: "Expands scope beyond MBBS and opens new career pathways.",
      footer: "CAREER-ORIENTED", icon: "🧬"
    },
    {
      id: 6,
      tag: "TB CONTROL (NTEP) 🫁", tagColor: "#38a169", bgGlow: "rgba(56, 161, 105, 0.2)",
      question: "Has India reduced TB burden under NTEP?",
      answer: "Yes, TB incidence has shown a significant decline.",
      insight: "17.7% reduction in TB incidence from 2015 to 2023.",
      footer: "MCQ FAVORITE", icon: "🫁"
    },
    {
      id: 7,
      tag: "HIV CONTROL (NACP) 🎗️", tagColor: "#38a169", bgGlow: "rgba(56, 161, 105, 0.2)",
      question: "How effective is India's HIV program?",
      answer: "India maintains a low HIV prevalence rate.",
      insight: "HIV prevalence is 0.22% in adults & ~14.2 lakh people are on free ART.",
      footer: "SHORT NOTE", icon: "🎗️"
    },
    {
      id: 8,
      tag: "PUBLIC HEALTH (NHM) 🏥", tagColor: "#3182ce", bgGlow: "rgba(49, 130, 206, 0.2)",
      question: "How has NHM improved health outcomes?",
      answer: "Major improvements in maternal, child and immunisation indicators.",
      insight: "MMR: 97 per lakh | U5MR: 32 per 1000 | Immunisation coverage: 93.23%",
      footer: "LONG ESSAY", icon: "👨‍👩‍👧‍👦"
    },
    {
      id: 9,
      tag: "IMMUNISATION (UIP) 💉", tagColor: "#319795", bgGlow: "rgba(49, 151, 149, 0.2)",
      question: "What are the biggest achievements of UIP?",
      answer: "India has eliminated major vaccine-preventable diseases.",
      insight: "Polio eliminated (2014) | Maternal & Neonatal Tetanus eliminated (2015).",
      footer: "VIVA", icon: "💉"
    },
    {
      id: 10,
      tag: "VECTOR DISEASES (NVBDCP) 🦟", tagColor: "#38a169", bgGlow: "rgba(56, 161, 105, 0.2)",
      question: "Which diseases are controlled under NVBDCP?",
      answer: "Malaria, Dengue, Kala-azar, JE, Chikungunya, Filariasis.",
      insight: "Kala-azar eliminated in 100% endemic blocks (2023).",
      footer: "MCQ", icon: "🦟"
    },
    {
      id: 11,
      tag: "NMC UPDATE 🏛️", tagColor: "#805ad5", bgGlow: "rgba(128, 90, 213, 0.2)",
      question: "What is the latest NMC curriculum update?",
      answer: "NMC mandates CBME-based learning with practical focus.",
      insight: "Forensic Medicine & Community Medicine are compulsory even for FMGs.",
      footer: "FMGE / NExT", icon: "🏛️"
    },
    {
      id: 12,
      tag: "EXAM UPDATE 🎓", tagColor: "#3182ce", bgGlow: "rgba(49, 130, 206, 0.2)",
      question: "What is NExT exam?",
      answer: "National Exit Test (NExT) will replace NEET PG.",
      insight: "Single exam for licensing & PG admissions. Expected rollout from 2026.",
      footer: "MUST KNOW", icon: "📝"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches ? e.targetTouches[0].clientX : e.clientX);
    setTouchEnd(e.targetTouches ? e.targetTouches[0].clientX : e.clientX); // Reset end
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.targetTouches ? e.targetTouches[0].clientX : e.clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      nextSlide();
    }
    if (distance < -50) {
      prevSlide();
    }
    setIsDragging(false);
  };

  // Auto-play feature
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div
      style={{
        width: "100%",
        marginTop: "40px",
        position: "relative",
      }}
    >
      {/* Premium Carousel Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "800px", // Reduced from 1000px
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "20px", // Slightly less rounded
          background: "linear-gradient(145deg, #1A1412 0%, #2C1E16 100%)",
          boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.5)",
          padding: "30px 0", // Reduced padding
          border: "1px solid rgba(212, 175, 55, 0.15)",
        }}
      >
        {/* Slides Container */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          style={{
            display: "flex",
            transition: isDragging ? "none" : "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
            transform: `translateX(-${currentSlide * 100}%)`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                minWidth: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px 40px",
                boxSizing: "border-box",
              }}
            >
              {/* Glassmorphic Card */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius: "16px",
                  padding: "25px", // Reduced from 40px
                  width: "100%",
                  maxWidth: "480px", // Reduced from 600px
                  boxShadow: `0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
                  position: "relative",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px", // Reduced gap
                }}
              >
                {/* Header Tag */}
                <div style={{
                  alignSelf: "flex-start",
                  background: `linear-gradient(90deg, ${slide.tagColor} 0%, rgba(255,255,255,0.1) 100%)`,
                  color: "white",
                  padding: "6px 12px", // Reduced
                  borderRadius: "20px",
                  fontSize: "11px", // Reduced
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  boxShadow: `0 4px 10px ${slide.bgGlow}`,
                  border: "1px solid rgba(255,255,255,0.2)"
                }}>
                  {slide.id < 10 ? `0${slide.id}` : slide.id} • {slide.tag}
                </div>

                {/* Question */}
                <h2 style={{ 
                  fontSize: "20px", // Reduced from 28px
                  color: "#FDFBF7", 
                  margin: "5px 0",
                  fontWeight: "800",
                  lineHeight: "1.3",
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)"
                }}>
                  {slide.question}
                </h2>

                {/* Answer */}
                <p style={{ 
                  fontSize: "15px", // Reduced from 18px
                  color: "#E2D8D0", 
                  lineHeight: "1.5",
                  margin: "0",
                  fontWeight: "300"
                }}>
                  {slide.answer}
                </p>

                {/* Premium Data Insight Box */}
                <div style={{
                  background: "rgba(0, 0, 0, 0.4)",
                  borderLeft: "3px solid #D4AF37", 
                  padding: "15px", // Reduced
                  borderRadius: "0 8px 8px 0",
                  marginTop: "5px",
                  boxShadow: "inset 0 0 15px rgba(0,0,0,0.5)"
                }}>
                  <div style={{ 
                    fontSize: "11px", // Reduced
                    color: "#D4AF37", 
                    fontWeight: "800", 
                    marginBottom: "6px",
                    letterSpacing: "1px" 
                  }}>
                    📊 DATA INSIGHT
                  </div>
                  <div style={{ fontSize: "13px", color: "#FDFBF7", fontWeight: "400", lineHeight: "1.4" }}>
                    {slide.insight}
                  </div>
                </div>

                {/* Footer */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid rgba(212, 175, 55, 0.2)",
                  paddingTop: "15px", // Reduced
                  marginTop: "5px"
                }}>
                  <span style={{ 
                    color: "#D4AF37", 
                    fontWeight: "600", 
                    fontSize: "12px", // Reduced
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase"
                  }}>
                    <span style={{ fontSize: "16px" }}>🏷️</span> {slide.footer}
                  </span>
                  <span style={{ fontSize: "24px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}>
                    {slide.icon}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Navigation Orb */}
        <button
          onClick={prevSlide}
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255, 255, 255, 0.05)",
            color: "#D4AF37", // Bronze arrow
            border: "1px solid rgba(212, 175, 55, 0.3)",
            fontSize: "16px", // Reduced
            width: "44px", // Reduced
            height: "44px", // Reduced
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            zIndex: 10,
            backdropFilter: "blur(10px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(212, 175, 55, 0.15)";
            e.target.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          &#10094;
        </button>

        {/* Next Navigation Orb */}
        <button
          onClick={nextSlide}
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255, 255, 255, 0.05)",
            color: "#D4AF37", // Bronze arrow
            border: "1px solid rgba(212, 175, 55, 0.3)",
            fontSize: "16px", // Reduced
            width: "44px", // Reduced
            height: "44px", // Reduced
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            zIndex: 10,
            backdropFilter: "blur(10px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(212, 175, 55, 0.15)";
            e.target.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          &#10095;
        </button>

        {/* Premium Dots Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px", // Reduced
            marginTop: "20px", // Reduced
            paddingBottom: "10px",
            flexWrap: "wrap",
            maxWidth: "300px", // Reduced
            margin: "20px auto 0" // Reduced
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? "24px" : "8px", // Reduced
                height: "8px", // Reduced
                borderRadius: "4px", // Reduced
                border: "none",
                background: index === currentSlide ? "linear-gradient(90deg, #D4AF37, #F3E5AB)" : "rgba(255,255,255,0.2)",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                boxShadow: index === currentSlide ? "0 0 10px rgba(212, 175, 55, 0.5)" : "none"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
