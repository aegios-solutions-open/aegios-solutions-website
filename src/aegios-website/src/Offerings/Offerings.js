import React from "react";
import './Offerings.css';
import MonteCarloSVG from "./MonteCarloSVG";
import HealthCareSVG from "./HealthcareSVG";
import NLPSvg from "./NLPSvg";
import JaggedBlockAnimationSVG from "./WaveAnimationSVG";

const offeringsDataTop = [
    { title: "Finance", description: "Advanced predictive models for risk analysis and integration into third party systems.", icon: <MonteCarloSVG/> },
    { title: "Healthcare", description: "AI-powered diagnostics and patient care solutions use machine learning to help doctors diagnose faster and provide personalized treatments.", icon: <HealthCareSVG/> }
];

const offeringsDataBottom = [   
    { title: "Manufacturing", description: "AI-focused automation technology improves production lines by reducing costs, and streamlines operations for maximum performance.", icon: <JaggedBlockAnimationSVG/> },
    { title: "Natural Language Processing", description: "Advanced NLP solutions for chatbots, automated customer support, and text analysis, enabling more efficient and intelligent communication.", icon: <NLPSvg/> }
];

const Offerings = () => {
    return (
        <div id="about" className="offering-div-display">
            <h1 className="offering-h1">Offerings</h1>
            <div className="offering-div">
                <p className="offering-text">We are AI generalists delivering solutions across mulitple industries such as finance, healthcare, and manufacturing.</p>
            </div>
            <div className="offering-cards-wrapper">
                <div className="offering-cards-container">
                    {offeringsDataTop.map((offering, index) => (
                        <div key={index} className="offering-card">
                            <span className="offering-icon">
                                {offering.icon}
                            </span>
                            <h2 className="offering-title">{offering.title}</h2>
                            <p className="offering-description">{offering.description}</p>
                        </div>
                    ))}
                </div>
                <div className="offering-cards-container">
                    {offeringsDataBottom.map((offering, index) => (
                        <div key={index} className="offering-card">
                            <span className="offering-icon">
                                {offering.icon}
                            </span>
                            <h2 className="offering-title">{offering.title}</h2>
                            <p className="offering-description">{offering.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Offerings;
