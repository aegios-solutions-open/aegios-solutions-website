import React, { useEffect, useState } from 'react';
import './Landing.css';
import ParticleFire from './PlasmaFire/PlasmaFire';

const texts = [
  "Changing how you do business with accelerated AI processes.",
  "Global presence, both in North America, and in the EU.",
  "In-house development, no subcontracting or offshore teams."
];

const typingSpeed = 60;
const delayBetweenTexts = 2000; // Delay before switching text

const Landing = () => {
  const [text, setText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    const currentText = texts[textIndex];

    const typeText = () => {
      if (charIndex <= currentText.length) {
        setText(currentText.slice(0, charIndex));
        charIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
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

    return () => {
      if (landingElement) observer.unobserve(landingElement);
    };
  }, [textIndex]);

  return (
    <div className="landing-container">
      <div id="landing-element">
        <h1 className='landing-title'>AEGIOS</h1>
        {isVisible && (
          <div className="fire-container">
            <ParticleFire className="particleFire" />
          </div>
        )}
        <div className='landing-text-column'>
          <p className="landing-text-typing">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
