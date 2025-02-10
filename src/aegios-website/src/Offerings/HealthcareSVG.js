import React, { useEffect, useState } from "react";

const generateHelixPaths = (loops = 3, width = 150, height = 150, amplitude = 20, points = 220) => {
    let leftStrand = `M ${width / 2 - amplitude} 0`;
    let rightStrand = `M ${width / 2 + amplitude} 0`;
    let basePairs = [];

    const yStep = height / points;

    for (let i = 0; i <= points; i++) {
        const y = i * yStep;
        const xOffset = Math.cos((i / points) * loops * Math.PI * 2) * amplitude;

        const leftX = width / 2 - xOffset;
        const rightX = width / 2 + xOffset;

        leftStrand += ` L ${leftX} ${y}`;
        rightStrand += ` L ${rightX} ${y}`;

        if (i % 10 === 0) {
            basePairs.push({ y, x1: leftX, x2: rightX });
        }
    }

    return { leftStrand, rightStrand, basePairs };
};

const HealthCareSVG = ({ loops = 1.5 }) => {
    const [paths, setPaths] = useState({ leftStrand: "", rightStrand: "", basePairs: [] });
    const [pathLength, setPathLength] = useState(0);

    useEffect(() => {
        const generatedPaths = generateHelixPaths(loops);
        setPaths(generatedPaths);

        // Calculate the path length to use for stroke animation
        const totalLength = generatedPaths.leftStrand.length;
        setPathLength(totalLength);
    }, [loops]);

    return (
        <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            style={{
                animation: "rotateSpiral 15s infinite linear", // Apply rotation after drawing finishes
            }} 
        >
            {/* Left Helix Strand */}
            <path
                d={paths.leftStrand}
                stroke="white"
                fill="none"
                strokeWidth="1.5"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength}
                style={{
                    animation: "drawLeft 85s linear infinite, changeColorLeft 5s linear infinite", // Animate color and drawing
                }}
            />
            
            {/* Right Helix Strand */}
            <path
                d={paths.rightStrand}
                stroke="white"
                fill="none"
                strokeWidth="1.5"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength}
                style={{
                    animation: "drawRight 85s linear infinite, changeColorRight 5s linear infinite", // Animate color and drawing
                }}
            />

            {/* Base Pairs (Connecting Paths) */}
            {paths.basePairs.map((pair, index) => (
                <path
                    key={index}
                    d={`M ${pair.x1} ${pair.y} L ${pair.x2} ${pair.y}`}  // Define the base pair as a path
                    stroke="white"
                    fill="none"
                    strokeWidth="1.5"
                    strokeDasharray={pathLength}
                    strokeDashoffset={pathLength}
                    style={{
                        animation: `drawCenter ${85 + index * 5}s linear infinite, changeColorCenter 5s linear infinite`, // Color change animation
                    }}
                />
            ))}

            <style>
                {`
                @keyframes drawLeft {
                    from { stroke-dashoffset: ${pathLength}; }
                    to { stroke-dashoffset: 0; }
                }

                @keyframes drawRight {
                    from { stroke-dashoffset: ${pathLength}; }
                    to { stroke-dashoffset: 0; }
                }

                @keyframes drawCenter {
                    from { stroke-dashoffset: ${pathLength}; }
                    to { stroke-dashoffset: 0; }
                }

                @keyframes rotateSpiral {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                @keyframes changeColorLeft {
                    0% { stroke: white; }
                    50% { stroke: blue; }
                    100% { stroke: white; }
                }

                @keyframes changeColorRight {
                    0% { stroke: white; }
                    50% { stroke: red; }
                    100% { stroke: white; }
                }

                @keyframes changeColorCenter {
                    0% { stroke: white; }
                    50% { stroke: purple; }
                    100% { stroke: white; }
                }
                `}
            </style>
        </svg>
    );
};

export default HealthCareSVG;
