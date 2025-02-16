import React, { useEffect, useState } from 'react';
import './TopBar.css';

const TopBar = () => {
  const [show, setShow] = useState(true); // Default to show the topbar

  useEffect(() => {
    let lastScrollTop = 0; // Track the last scroll position

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // If scrolling up (scrollTop < lastScrollTop), hide the topbar
      if (scrollTop < lastScrollTop) {
        setShow(false); // Hide the topbar when scrolling up
      } else {
        setShow(true); // Show the topbar when scrolling down
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll values
    };

    window.addEventListener('scroll', handleScroll); // Listen for the scroll event

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up the event listener
    };
  }, []);

  return (
    <div className={`topbar ${show ? 'show' : 'hide'}`}>
      <div className="title">AEGIOS</div>
      <nav>
        <ul className="navList">
          <li className="navItem" ><a href="/">Home</a></li>
          <li className="navItem"  key="about"><a href="#about">Offerings</a></li>
          <li className="navItem" key="contact"><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
