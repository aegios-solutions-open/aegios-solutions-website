import React, { useState, useEffect } from "react";
import './NLPSvg.css';  // Your existing CSS file with Brutalist styles

const targetWords = ["Apple", "Identity", "Savings", "Personal"]; // Array of target words

const NLPSvg = () => {
    const [text, setText] = useState("_____"); // Initially random letters
    const [stage, setStage] = useState(0); // Stage to track which letter to reveal
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // Index to track the current word
    const [isPaused, setIsPaused] = useState(false); // Flag to hold the word before switching

    const targetWord = targetWords[currentWordIndex];

    useEffect(() => {
        if (isPaused) return; // If paused, do nothing

        const interval = setInterval(() => {
            setStage((prev) => {
                if (prev < targetWord.length) {
                    return prev + 1;  // Reveal the next letter
                } else {
                    // When fully revealed, pause before moving to the next word
                    setIsPaused(true);
                    setTimeout(() => {
                        setIsPaused(false);
                        setStage(0); // Reset stage for the new word
                        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % targetWords.length);
                    }, 2000); // 2-second delay before switching
                    return prev;  // Hold at the last letter
                }
            });
        }, 1000); // Reveal each letter every 1 second

        return () => clearInterval(interval);
    }, [currentWordIndex, targetWord.length, isPaused]);

    useEffect(() => {
        const randomizeText = () => {
            const currentText = targetWord
                .split('')
                .map((letter, index) => (index < stage ? letter : String.fromCharCode(65 + Math.floor(Math.random() * 26))))
                .join('');
            setText(currentText);
        };

        randomizeText();
    }, [stage, targetWord]);

    const renderTextWithBlinking = () => {
        return text.split('').map((letter, index) => (
            <span key={index} className={index === stage - 1 ? "blinkingLetter" : ""}>
                {letter}
            </span>
        ));
    };

    return (
        <div style={{ color: "white" , marginTop: 45}}>
            <h1 className="transitionText">
                {renderTextWithBlinking()}
            </h1>
        </div>
    );
};

export default NLPSvg;
