import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const JaggedBlockAnimationSVG = () => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStage((prev) => (prev < 7 ? prev + 1 : 0)); // Loop through stages
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* First animated block path (jagged) */}
            <motion.path
                d="M0,100 L40,80 L70,110 L100,70 L130,90 L160,60 L190,80 L200,100"
                fill="lightblue"
                stroke="white"
                strokeWidth="3"
                opacity={0.5}
                animate={{
                    d: [
                        "M0,100 L40,60 L70,100 L100,80 L130,110 L160,70 L190,90 L200,100",
                        "M0,100 L40,90 L70,80 L100,100 L130,60 L160,110 L190,70 L200,100",
                        "M0,100 L40,70 L70,110 L100,60 L130,90 L160,80 L190,110 L200,100",
                        "M0,100 L40,80 L70,90 L100,70 L130,100 L160,60 L190,110 L200,100",
                        "M0,100 L40,110 L70,90 L100,60 L130,80 L160,70 L190,60 L200,100",
                        "M0,100 L40,100 L70,70 L100,90 L130,110 L160,90 L190,80 L200,100",
                        "M0,100 L40,80 L70,100 L100,110 L130,70 L160,90 L190,110 L200,100",
                    ]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
            />
            {/* Second jagged path (block-like) */}
            <motion.path
                d="M0,100 L40,90 L70,100 L100,60 L130,80 L160,90 L190,70 L200,100"
                fill="blue"
                stroke="white"
                strokeWidth="3"
                opacity={0.3}
                animate={{
                    d: [
                        "M0,100 L40,70 L70,90 L100,80 L130,100 L160,60 L190,110 L200,100",
                        "M0,100 L40,100 L70,80 L100,90 L130,60 L160,110 L190,80 L200,100",
                        "M0,100 L40,110 L70,70 L100,100 L130,80 L160,90 L190,70 L200,100",
                        "M0,100 L40,90 L70,60 L100,110 L130,70 L160,80 L190,100 L200,100",
                        "M0,100 L40,80 L70,110 L100,70 L130,90 L160,60 L190,80 L200,100",
                        "M0,100 L40,60 L70,90 L100,100 L130,80 L160,110 L190,100 L200,100",
                        "M0,100 L40,80 L70,100 L100,80 L130,90 L160,60 L190,110 L200,100",
                    ]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
            />
            {/* Third, bigger wave */}
            <motion.path
                d="M0,100 L50,50 L100,150 L150,50 L200,100"
                fill="green"
                stroke="white"
                strokeWidth="3"
                opacity={0.4}
                animate={{
                    d: [
                        "M0,100 L50,30 L100,170 L150,30 L200,100",
                        "M0,100 L50,80 L100,140 L150,60 L200,100",
                        "M0,100 L50,120 L100,130 L150,40 L200,100",
                        "M0,100 L50,60 L100,150 L150,80 L200,100",
                        "M0,100 L50,40 L100,160 L150,50 L200,100",
                        "M0,100 L50,90 L100,120 L150,70 L200,100",
                        "M0,100 L50,70 L100,140 L150,30 L200,100",
                    ]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
            />
        </svg>
    );
};

export default JaggedBlockAnimationSVG;
