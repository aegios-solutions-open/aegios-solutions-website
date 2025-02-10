import React, { useEffect, useRef, useState } from "react";

const seededRandom = (seed) => {
    let state = seed % 2147483647;
    if (state <= 0) state += 2147483646;
    return () => (state = (state * 16807) % 2147483647) / 2147483647;
};


const generateMonteCarloPath = (steps = 100, width = 200, height = 100, seed = 15) => {
    let path = `M 0 ${height / 2}`;
    let xStep = width / steps;
    let y = height / 2;

    const rand = seededRandom(seed); // Create a seeded random function

    for (let i = 1; i <= steps; i++) {
        y += (rand() - 0.5) * 11; // Use seeded random instead of Math.random()
        path += ` L ${i * xStep} ${y}`;
    }

    return path;
};

const MonteCarloSVG = ({ numPaths = 5, seed = 15 }) => {
    const [paths, setPaths] = useState([]);
    const pathRefs = useRef([]);

    useEffect(() => {
        // Generate paths with unique seeds for each
        const newPaths = Array.from({ length: numPaths }, (_, i) => ({
            d: generateMonteCarloPath(100, 200, 100, seed + i), // Different seed for each path
            length: 0,
        }));
        setPaths(newPaths);
    }, [numPaths, seed]);

    useEffect(() => {
        if (paths.length === numPaths) {
            const updatedPaths = paths.map((path, index) => ({
                ...path,
                length: pathRefs.current[index]?.getTotalLength() || 0,
            }));
            setPaths(updatedPaths);
        }
    }, [paths.length]);

    return (
        <svg width="200" height="120" viewBox="0 0 200 100">
            {paths.map((path, index) => (
                <path
                    key={index}
                    ref={(el) => (pathRefs.current[index] = el)}
                    d={path.d}
                    stroke={`hsl(${index * 60}, 80%, 60%)`}
                    fill="none"
                    strokeWidth="1.5"
                    strokeDasharray={path.length}
                    strokeDashoffset={path.length}
                    style={{ animation: `draw${index} 4.5s linear infinite` }}
                />
            ))}
            <style>
                {paths
                    .map(
                        (path, index) => `
                    @keyframes draw${index} {
                        from { stroke-dashoffset: ${path.length}; }
                        to { stroke-dashoffset: 0; }
                    }
                `
                    )
                    .join("\n")}
            </style>
        </svg>
    );
};


export default MonteCarloSVG;
