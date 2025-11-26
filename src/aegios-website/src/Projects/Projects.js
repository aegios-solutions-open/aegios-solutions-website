import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';
import customIngestImg from '../assets/images/custom-ingest.png';
import analyticsImg from '../assets/images/analytics.png';
import toolSelectionImg from '../assets/images/tool-selection.png';
import sourus1 from '../assets/images/sourus/sourus-1.png';
import sourus2 from '../assets/images/sourus/sourus-2.png';
import sourus3 from '../assets/images/sourus/sourus-3.png';
import sourus4 from '../assets/images/sourus/sourus-4.png';
import sourus5 from '../assets/images/sourus/sourus-5.png';
import sourus6 from '../assets/images/sourus/sourus-6.png';
import sourus7 from '../assets/images/sourus/sourus-7.png';
import csp1 from '../assets/images/csp-agent/csp-image-1.png';
import csp2 from '../assets/images/csp-agent/csp-image-2.png';
import csp3 from '../assets/images/csp-agent/csp-image-3.png';

const Projects = () => {
    const [visibilityRatio, setVisibilityRatio] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [activeCarousel, setActiveCarousel] = useState(null); // 'aegios' or 'sourus'
    const sectionRef = useRef(null);

    const aegiosImages = [customIngestImg, analyticsImg, toolSelectionImg];
    const sourusImages = [sourus1, sourus2, sourus3, sourus4, sourus5, sourus6, sourus7];
    const cspImages = [csp1, csp2, csp3];

    const handleNext = (e) => {
        e.stopPropagation();
        if (activeCarousel === 'aegios') {
            setExpandedIndex((prev) => (prev + 1) % aegiosImages.length);
        } else if (activeCarousel === 'sourus') {
            setExpandedIndex((prev) => (prev + 1) % sourusImages.length);
        } else if (activeCarousel === 'csp') {
            setExpandedIndex((prev) => (prev + 1) % cspImages.length);
        }
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (activeCarousel === 'aegios') {
            setExpandedIndex((prev) => (prev - 1 + aegiosImages.length) % aegiosImages.length);
        } else if (activeCarousel === 'sourus') {
            setExpandedIndex((prev) => (prev - 1 + sourusImages.length) % sourusImages.length);
        } else if (activeCarousel === 'csp') {
            setExpandedIndex((prev) => (prev - 1 + cspImages.length) % cspImages.length);
        }
    };

    const openModal = (index, carousel) => {
        setExpandedIndex(index);
        setActiveCarousel(carousel);
    };

    const closeModal = () => {
        setExpandedIndex(null);
        setActiveCarousel(null);
    };

    const getCurrentImages = () => {
        if (activeCarousel === 'aegios') return aegiosImages;
        if (activeCarousel === 'sourus') return sourusImages;
        if (activeCarousel === 'csp') return cspImages;
        return [];
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setVisibilityRatio(entry.intersectionRatio);
                });
            },
            {
                threshold: Array.from({ length: 101 }, (_, i) => i / 100),
                rootMargin: '0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const getElementStyle = (baseDelay = 0) => {
        const scaledRatio = Math.min(1, visibilityRatio / 0.1);
        const progress = Math.max(0, Math.min(1, (scaledRatio - baseDelay) / (1 - baseDelay)));
        const opacity = progress;
        const translateY = (1 - progress) * 40;

        return {
            opacity,
            transform: `translateY(${translateY}px)`,
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
        };
    };

    const handleContactClick = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="projects-section" id="projects" ref={sectionRef}>
            <div className="projects-container">
                <div className="projects-content">
                    <div className="projects-background">
                        <div className="bg-rectangle bg-rect-1"></div>
                        <div className="bg-rectangle bg-rect-2"></div>
                        <div className="bg-rectangle bg-rect-3"></div>
                    </div>

                    <h2 className="projects-heading" >Our Works</h2>

                    <div className="projects-grid">
                        <div className="projects-item">
                            <div className="project-carousel-container">
                                <div className="project-carousel-track">
                                    {/* First Set */}
                                    <img
                                        src={customIngestImg}
                                        alt="Aegios Platform Custom Ingest"
                                        className="project-carousel-image"
                                        onClick={() => openModal(0, 'aegios')}
                                    />
                                    <img
                                        src={analyticsImg}
                                        alt="Aegios Platform Analytics"
                                        className="project-carousel-image"
                                        onClick={() => openModal(1, 'aegios')}
                                    />
                                    <img
                                        src={toolSelectionImg}
                                        alt="Aegios Platform Tool Selection"
                                        className="project-carousel-image"
                                        onClick={() => openModal(2, 'aegios')}
                                    />

                                    {/* Duplicate Set for Seamless Loop */}
                                    <img
                                        src={customIngestImg}
                                        alt="Aegios Platform Custom Ingest"
                                        className="project-carousel-image"
                                        onClick={() => openModal(0, 'aegios')}
                                    />
                                    <img
                                        src={analyticsImg}
                                        alt="Aegios Platform Analytics"
                                        className="project-carousel-image"
                                        onClick={() => openModal(1, 'aegios')}
                                    />
                                    <img
                                        src={toolSelectionImg}
                                        alt="Aegios Platform Tool Selection"
                                        className="project-carousel-image"
                                        onClick={() => openModal(2, 'aegios')}
                                    />
                                </div>
                                <div className="carousel-overlay"></div>
                            </div>
                            <div className="projects-item-content">
                                <h3 className="projects-item-title">Aegios Platform</h3>
                                <p className="projects-item-description">
                                    A local LLM system that integrates into your file system and is able to ingest and process multiple files to be used as a knowledge base.
                                    It delivers a ChatGPT-like experience but completely 100% local.
                                </p>
                            </div>
                        </div>
                        {/* Add more project items here if needed */}
                        <div className="projects-item">
                            <div className="project-carousel-container">
                                <div className="project-carousel-track sourus-track">
                                    {/* First Set */}
                                    {sourusImages.map((img, index) => (
                                        <img
                                            key={`sourus-${index}`}
                                            src={img}
                                            alt={`Sourus Interface ${index + 1}`}
                                            className="project-carousel-image"
                                            onClick={() => openModal(index, 'sourus')}
                                        />
                                    ))}

                                    {/* Duplicate Set for Seamless Loop */}
                                    {sourusImages.map((img, index) => (
                                        <img
                                            key={`sourus-dup-${index}`}
                                            src={img}
                                            alt={`Sourus Interface ${index + 1}`}
                                            className="project-carousel-image"
                                            onClick={() => openModal(index, 'sourus')}
                                        />
                                    ))}
                                </div>
                                <div className="carousel-overlay"></div>
                            </div>
                            <div className="projects-item-content">
                                <h3 className="projects-item-title">Sourus</h3>
                                <p className="projects-item-description">
                                    A lightweight monitoring system with a focus on a low memory footprint, CPU/GPU usage and temperature primarily used for servers and workstations for extremely heavy AI workloads.
                                </p>
                            </div>
                        </div>
                        <div className="projects-item">
                            <div className="project-carousel-container">
                                <div className="project-carousel-track">
                                    {/* First Set */}
                                    {cspImages.map((img, index) => (
                                        <img
                                            key={`csp-${index}`}
                                            src={img}
                                            alt={`CSP Agent Interface ${index + 1}`}
                                            className="project-carousel-image"
                                            onClick={() => openModal(index, 'csp')}
                                        />
                                    ))}

                                    {/* Duplicate Set for Seamless Loop */}
                                    {cspImages.map((img, index) => (
                                        <img
                                            key={`csp-dup-${index}`}
                                            src={img}
                                            alt={`CSP Agent Interface ${index + 1}`}
                                            className="project-carousel-image"
                                            onClick={() => openModal(index, 'csp')}
                                        />
                                    ))}
                                </div>
                                <div className="carousel-overlay"></div>
                            </div>
                            <div className="projects-item-content">
                                <h3 className="projects-item-title">CSP Entity AI Assistant</h3>
                                <p className="projects-item-description">
                                    An AI assistant that helps CSPs manage their entities and their accounts with AI integrations, advisements, and automation.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button className="projects-button" onClick={handleContactClick}>
                        CONTACT US
                    </button>
                </div>
            </div>

            {expandedIndex !== null && activeCarousel && (
                <div className="image-modal-overlay" onClick={closeModal}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-nav-button modal-nav-prev" onClick={handlePrev}>&lt;</button>
                        <img src={getCurrentImages()[expandedIndex]} alt="Expanded view" />
                        <button className="modal-nav-button modal-nav-next" onClick={handleNext}>&gt;</button>
                        <button className="modal-close-button" onClick={closeModal}>×</button>
                    </div>
                </div>
            )}
        </div >
    );
};

export default Projects;
