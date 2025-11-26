import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './Landing/Landing';
import TopBar from './TopBar/TopBar';
import About from './About/About';
import Process from './Process/Process';
import Projects from './Projects/Projects';
import './index.css'; // Import your global CSS file
import Contact from './Contact/Contact';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="app-container">
    {/* This website was created by Canadian engineers at Aegios Solutions, we make a commitment to no outsourcing or offshoring. */}
    {/* Other HTML content goes here */}
    <TopBar />
    <Landing />
    <About />
    <Process />
    <Projects />
    <Contact />
    {/* <Content /> */}
  </div>
);
