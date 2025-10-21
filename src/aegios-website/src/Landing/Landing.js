import React, { useEffect, useState, useRef } from 'react';
import './Landing.css';
import logo from '../assets/images/aegios-logo.png';

const texts = [
  "Private AI LLMs for the discreet service provider.",
  "Changing how you do business with accelerated AI processes.",
  "Perfect for corporate services, law firms, and more.",
  "Global presence, both in North America, and in the EU.",
  "Multi-lingual options available.",
  "In-house development, no subcontracting or offshore teams."
];

const typingSpeed = 60;
const delayBetweenTexts = 4000; // Delay before switching text

const Landing = () => {
  const [text, setText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleAudioToggle = () => {
    const audioElement = document.getElementById('audio');
    if (audioElement) {
      if (audioElement.paused) {
        audioElement.play();
        setIsAudioPlaying(true);
      } else {
        audioElement.pause();
        setIsAudioPlaying(false);
      }
    }

    // Smoothly scroll to About section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    let charIndex = 0;
    const currentText = texts[textIndex];

    const typeText = () => {
      if (charIndex <= currentText.length) {
        setText(currentText.slice(0, charIndex));
        charIndex++;
        setIsTyping(true);
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setText('');
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, delayBetweenTexts);
      }
    };

    typeText();

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const landingElement = document.getElementById('landing-element');
    if (landingElement) observer.observe(landingElement);

    // Show grid after 1.5 seconds
    const gridTimer = setTimeout(() => {
      setShowGrid(true);
    }, 1500);

    return () => {
      if (landingElement) observer.unobserve(landingElement);
      clearTimeout(gridTimer);
    };
  }, [textIndex]);

  return (
    <div className="landing-container" id="home">
      {/* Brutalist Blocks */}
      <div className="brutalist-container">
        <div className="brutalist-block left">
          <div className="brutalist-details"></div>
        </div>
        <div className="brutalist-block right">
          <div className="brutalist-details"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="hero-content" id="landing-element">
        {/* Floating rectangles for landing section */}
        {/* <div className="landing-bg-rectangle landing-bg-rect-1">
          <span className="greek-symbol">Ξ</span>
        </div>
        <div className="landing-bg-rectangle landing-bg-rect-2">
          <span className="greek-symbol">Γ</span>
        </div>
        <div className="landing-bg-rectangle landing-bg-rect-3">
          <span className="greek-symbol">Δ</span>
        </div>
        <div className="landing-bg-rectangle landing-bg-rect-4">
          <span className="greek-symbol">Θ</span>
        </div>
        <div className="landing-bg-rectangle landing-bg-rect-5">
          <span className="greek-symbol">Σ</span>
        </div>
         */}
        <div className="title-container">
          <div className="hero-logo-wrapper">
            <img src={logo} alt="Aegios Logo" className="hero-logo" />
          </div>
          
          <h1 className="hero-title">AEGIOS</h1>
          {/* <div className="cube-animations-wrapper">
            <div className="cube-animation">
              <div className="grid">
                {Array.from({ length: 16 }, (_, index) => (
                  <div key={index} className="cube" />
                ))}
              </div>
            </div>
            <div className="cube-animation">
              <div className="grid">
                {Array.from({ length: 16 }, (_, index) => (
                  <div key={`cube2-${index}`} className="cube" />
                ))}
              </div>
            </div>
          </div> */}
        </div>
        
        {/* Typing Text */}
        {isVisible && (
          <div className="typing-container">
            <p className="typing-text">
              {text}
              {!isTyping && text && <span className="cursor-blink">|</span>}
            </p>
          </div>
        )}

        {/* Volume Toggle */}
        <button className="landing-audio-toggle" onClick={handleAudioToggle}>
          <div className="audio-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="landing-audio-logo">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="audio-label">{isAudioPlaying ? 'Pause Music' : 'Play Music'}</span>
        </button>
      </div>

    </div>
  );
};

export default Landing;
