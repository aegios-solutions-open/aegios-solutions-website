import React, { useEffect, useState } from 'react';
import './Landing.css';
import ParticleFire from './PlasmaFire/PlasmaFire';

const fullTexts = [
  "Changing how you do business with accelerated AI processes.",
  "Global presence, both in North America, and in the EU.",
  "In-house development, no subcontracting or offshore teams."
];

const Landing = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  const [showCursor3, setShowCursor3] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Track if the Landing element is visible

  var typingSpeed = 60;
  const delayBetweenTexts = 1000;

  useEffect(() => {
    let i = 0, j = 0, k = 0;

    // Type first text
    const type1 = () => {
      if (i <= fullTexts[0].length) {
        setText1(fullTexts[0].slice(0, i));
        i++;
        setTimeout(type1, typingSpeed);
      } else {
        setShowCursor1(false); // Stop blinking cursor
        typingSpeed = 50;
        setShowCursor2(true);  // Start blinking for the next text
        setTimeout(type2, delayBetweenTexts);
      }
    };

    // Type second text
    const type2 = () => {
      if (j <= fullTexts[1].length) {
        setText2(fullTexts[1].slice(0, j));
        j++;
        setTimeout(type2, typingSpeed);
      } else {
        typingSpeed = 30;
        setShowCursor2(false); // Stop blinking cursor
        setShowCursor3(true);  // Start blinking for the next text
        setTimeout(type3, delayBetweenTexts);
      }
    };

    // Type third text
    const type3 = () => {
      if (k <= fullTexts[2].length) {
        setText3(fullTexts[2].slice(0, k));
        k++;
        setTimeout(type3, typingSpeed);
      } else {
        setShowCursor3(false); // Stop blinking cursor
      }
    };

    type1();

    // Intersection Observer to track when Landing is visible in the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Update the state based on visibility
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    // Observe the Landing element
    const landingElement = document.getElementById('landing-element');
    if (landingElement) {
      observer.observe(landingElement);
    }

    // Cleanup observer when the component is unmounted
    return () => {
      if (landingElement) {
        observer.unobserve(landingElement);
      }
    };
  }, []);

  return (
    <div className="landing-container">
      <div id="landing-element"> {/* Add an ID for the target element */}
        <div>
          <h1 className='landing-title'>AEGIOS</h1>
        </div>
        {/* Conditionally render ParticleFire based on visibility */}
        {isVisible && (
          <div className="fire-container">
            <ParticleFire className="particleFire" />
          </div>
        )}
        <div className='landing-text-column'>
          <div className='landing-text-div-1'>
            <p 
              className={`landing-text-1 ${showCursor1 ? 'typing' : ''}`} 
              style={{ width: `${text1.length}ch` }}
            >
              {text1}
            </p>
          </div>
          <div className='landing-text-div-2'>
            <p 
              className={`landing-text-2 ${showCursor2 ? 'typing' : ''}`} 
              style={{ width: `${text2.length}ch` }}
            >
              {text2}
            </p>
          </div>
          <div className='landing-text-div-3'>             
            <p 
              className={`landing-text-3 ${showCursor3 ? 'typing' : ''}`} 
              style={{ width: `${text3.length}ch` }}
            >
              {text3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
