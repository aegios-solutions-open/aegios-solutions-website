import React, { useEffect, useRef } from 'react';
import logo from '../assets/images/aegios-logo.png';

const SpaceScene = () => {
  const audioRef = useRef(null);
  const audioButtonRef = useRef(null);

  useEffect(() => {
    const handleAudioToggle = () => {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    };

    const button = audioButtonRef.current;
    if (button) {
      button.addEventListener('click', handleAudioToggle);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleAudioToggle);
      }
    };
  }, []);

  // Seeded random number generator
  const seededRandom = (seed) => {
    let state = seed;
    return () => {
      state = (state * 1664525 + 1013904223) % 4294967296;
      return state / 4294967296;
    };
  };

  // Generate random positions with seed for consistency
  const rand = seededRandom(42); // Fixed seed for reproducible results
  
  const generateRandomStyle = (index) => ({
    '--x': rand(),
    '--y': rand(),
    '--x2': rand() - 0.5,
    '--y2': rand() - 0.5,
    '--delay': rand(),
  });

  return (
    <div className="space-scene-wrapper">
      <div className="stars"></div>
      <div className="stars-highlights"></div>
      <div className="planets">
        {[...Array(50)].map((_, i) => <div key={i} style={generateRandomStyle(i)}></div>)}
      </div>
      <div className="planets-2">
        {[...Array(50)].map((_, i) => <div key={i} style={generateRandomStyle(i)}></div>)}
      </div>
      <div className="startails">
        {[...Array(200)].map((_, i) => <div key={i} style={generateRandomStyle(i)}></div>)}
      </div>
      <div className="scene">
        <div className="sun"></div>
        <div className="planet"></div>
        <div className="planet-2"></div>
        <div className="planet-3"></div>
        <div className="planet-4"></div>
        <div className="planet-6"></div>
        <div className="planet-5">
          <div className="structure-1"></div>
          <div className="structure-2"></div>
          <div className="structure-3"></div>
        </div>
        <div className="human">
          <div className="neck"></div>
          <div className="head"></div>
          <div className="body">
            <div className="shoulder"></div>
            <div className="back"></div>
            <div className="hip">
              <div className="center"></div>
            </div>
          </div>
          <div className="leg left">
            <div className="knee"></div>
            <div className="lower"></div>
          </div>
          <div className="leg right">
            <div className="knee"></div>
            <div className="lower"></div>
          </div>
          <div className="arm left">
            <div className="hand"></div>
          </div>
          <div className="arm right">
            <div className="hand"></div>
          </div>
        </div>
        <div className="human shadow">
          <div className="neck"></div>
          <div className="head"></div>
          <div className="body">
            <div className="shoulder"></div>
            <div className="back"></div>
            <div className="hip">
              <div className="center"></div>
            </div>
          </div>
          <div className="leg left">
            <div className="knee"></div>
            <div className="lower"></div>
          </div>
          <div className="leg right">
            <div className="knee"></div>
            <div className="lower"></div>
          </div>
          <div className="arm left">
            <div className="hand"></div>
          </div>
          <div className="arm right">
            <div className="hand"></div>
          </div>
        </div>
        <div className="cuboid">
          <div className="object">
            <div className="body"></div>
          </div>
          <div className="top">
            <div className="outline"></div>
            <div className="outline"></div>
            <div className="outline"></div>
            <div className="outline"></div>
          </div>
          <div className="front"></div>
          <div className="right"></div>
        </div>
      </div>
      <button ref={audioButtonRef} id="audiobutton" className="audio-icon-button">
        <img src={logo} alt="Audio Toggle" className="audio-logo" />
      </button>
      <audio ref={audioRef} id="audio" loop src="https://assets.codepen.io/907471/cosmic_dreams.mp3"></audio>
      <div className="highlight"></div>
      <div className="color-filter"></div>
      <svg className="filter" xmlns="http://www.w3.org/2000/svg">
        <filter id="stars">
          <feTurbulence baseFrequency="0.275" />
          <feColorMatrix values="0 0 0 9 -5
                                 0 0 0 9 -4
                                 0 0 0 9 -5
                                 0 0 0 0 1" />
        </filter>
        <filter id="stars-highlights">
          <feTurbulence baseFrequency="0.675" />
          <feColorMatrix values="0 0 0 9 -5
                                 0 0 0 9 -4
                                 0 0 0 9 -5
                                 0 0 0 0 1" />
        </filter>
        <filter id="planet-structure">
          <feTurbulence baseFrequency="0.195" />
          <feColorMatrix values="0 0 0 1 -9
                                 0 0 0 9 -1.5
                                 0 0 0 2 -6
                                 0 0 0 0 1" />
        </filter>
      </svg>
    </div>
  );
};

export default SpaceScene;

