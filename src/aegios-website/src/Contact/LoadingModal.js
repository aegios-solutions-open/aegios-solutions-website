import React, { useEffect, useState } from "react";

const LoadingModal = ({ onClose }) => {
  const targetWord = "Sending...";
  const [displayWord, setDisplayWord] = useState(targetWord);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setDisplayWord((prev) =>
        prev
          .split("")
          .map((char, i) =>
            Math.random() > 0.5 || char === targetWord[i]
              ? targetWord[i]
              
              : String.fromCharCode(65 + Math.floor(Math.random() * 26)) // Random letter
          )
          .join("")
      );
      count++;
      if (count > 10) {
        clearInterval(interval);
        setTimeout(onClose, 1000); // Close modal after finishing animation
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{displayWord}</h2>
      </div>
    </div>
  );
};

export default LoadingModal;
