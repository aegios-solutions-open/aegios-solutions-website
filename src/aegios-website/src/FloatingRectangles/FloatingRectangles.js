import React, { useEffect, useRef } from 'react';
import './FloatingRectangles.css';

const FloatingRectangles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Seeded random number generator
    const seededRandom = (seed) => {
      let state = seed;
      return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
      };
    };

    const rand = seededRandom(42); // Fixed seed for reproducible results

    // Color palette: blue gradient and light-grey gradients
    const colorPalette = [
      { bg: 'linear-gradient(45deg, rgba(128, 208, 199, 0.25) 0%, rgba(0, 147, 233, 0.25) 100%)', border: 'rgba(128, 208, 199, 0.1)' }, // Blue gradient
      { bg: 'linear-gradient(45deg, rgba(200, 200, 200, 0.25) 0%, rgba(180, 180, 180, 0.25) 100%)', border: 'rgba(200, 200, 200, 0.1)' }, // Light grey gradient
      { bg: 'linear-gradient(90deg, rgba(220, 220, 220, 0.25) 0%, rgba(190, 190, 190, 0.25) 100%)', border: 'rgba(220, 220, 220, 0.1)' }, // Light grey gradient 2
      { bg: 'linear-gradient(135deg, rgba(210, 210, 210, 0.25) 0%, rgba(185, 185, 185, 0.25) 100%)', border: 'rgba(210, 210, 210, 0.1)' }, // Light grey gradient 3
    ];

    // Create rectangles dynamically based on screen size
    const rectangles = [];
    const screenWidth = window.innerWidth;
    
    // Adjust number of rectangles based on screen size
    let numRectangles, numCornerRects;
    if (screenWidth < 768) {
      // Mobile
      numRectangles = 30;
      numCornerRects = 4;
    } else if (screenWidth < 1024) {
      // Tablet
      numRectangles = 50;
      numCornerRects = 4;
    } else if (screenWidth < 1440) {
      // Small desktop
      numRectangles = 70;
      numCornerRects = 6;
    } else {
      // Large desktop
      numRectangles = 80;
      numCornerRects = 6;
    }

    for (let i = 0; i < numRectangles + numCornerRects; i++) {
      const rect = document.createElement('div');
      rect.className = 'floating-rect';
      
      // Seeded random properties for variety
      const size = rand() * 65 + 15; // 15-80px - smaller rectangles with good variation
      const depth = rand(); // 0-1 for depth effect
      
      // Position rectangles - place some in corners, rest spread out
      let x, y;
      
      // First 6 rectangles go in top corners
      if (i < numCornerRects) {
        if (i < numCornerRects / 2) {
          // Top left corner
          x = rand() * 15 + 0; // 0-15%
          y = rand() * 20 + 0; // 0-20%
        } else {
          // Top right corner
          x = rand() * 15 + 85; // 85-100%
          y = rand() * 20 + 0; // 0-20%
        }
      } else {
        // Regular positioning away from center for the rest
        x = rand() * 100; // 0-100%
        y = rand() * 100; // 0-100%
        
        // Define center exclusion zone (larger vertical zone)
        const centerMinX = 35, centerMaxX = 65;
        const centerMinY = 25, centerMaxY = 75; // Increased vertical exclusion zone
        
        // If position is in center zone, push it to the nearest edge
        if (x >= centerMinX && x <= centerMaxX && y >= centerMinY && y <= centerMaxY) {
          // Calculate distances to each edge of the exclusion zone
          const distToLeft = x - centerMinX;
          const distToRight = centerMaxX - x;
          const distToTop = y - centerMinY;
          const distToBottom = centerMaxY - y;
          
          // Find minimum distance and push to that edge with more spread
          const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
          if (minDist === distToLeft) x = centerMinX - (rand() * 25 + 10); // Push left with more spread
          else if (minDist === distToRight) x = centerMaxX + (rand() * 25 + 10); // Push right with more spread
          else if (minDist === distToTop) y = centerMinY - (rand() * 25 + 10); // Push up with more spread
          else y = centerMaxY + (rand() * 25 + 10); // Push down with more spread
        }
      }
      
      const duration = rand() * 40 + 30; // 30-70 seconds
      const delay = rand() * -20; // Stagger the animations
      
      // Uniform opacity for all rectangles
      const opacity = 0.40; // Same opacity for all rectangles
      const blur = (1 - depth) * 2; // More distant = more blur
      const scale = 0.3 + (depth * 0.7); // More distant = smaller
      
      // Randomly choose between two aspect ratios
      const aspectRatio = rand() > 0.5 ? (9/8) : (10/9); // 8:9 or 9:10
      
      rect.style.width = `${size}px`;
      rect.style.height = `${size * aspectRatio}px`;
      rect.style.left = `${x}%`;
      rect.style.top = `${y}%`;
      rect.style.transform = `
        scale(${scale}) 
        translateZ(${-depth * 500}px)
      `;
      rect.style.opacity = opacity;
      rect.style.filter = `blur(${blur}px)`;
      rect.style.animationDuration = `${duration}s`;
      rect.style.animationDelay = `${delay}s`;
      
      // Apply color gradient with transparent borders (randomly select from palette)
      const colorIndex = Math.floor(rand() * colorPalette.length);
      const rectangleColor = colorPalette[colorIndex];
      const borderWidth = rand() > 0.5 ? '1px' : '2px';
      
      rect.style.background = rectangleColor.bg; // Use 'background' instead of 'backgroundColor' for gradients
      rect.style.border = `${borderWidth} solid ${rectangleColor.border}`;
      
      container.appendChild(rect);
      rectangles.push(rect);
    }

    // Cleanup
    return () => {
      rectangles.forEach(rect => rect.remove());
    };
  }, []);

  return (
    <div className="floating-rectangles-container" ref={containerRef}>
      {/* Rectangles will be dynamically added here */}
    </div>
  );
};

export default FloatingRectangles;

