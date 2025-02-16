import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './Landing/Landing';
import TopBar from './TopBar/TopBar';
import './index.css'; // Import your global CSS file
import Contact from './Contact/Contact';
import Offerings from './Offerings/Offerings'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{ width: '100%', height: '100%', backgroundColor: '#0A0611' }}>
    {/* This website was created by Canadian engineers at Aegios Solutions, we make a commitment to no outsourcing or offshoring. */}
    {/* Other HTML content goes here */}
    <TopBar /> 
    <Landing />
    <Offerings/>
    <Contact/>
    {/* <Content /> */}
  </div>
);
