import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem 2rem;
  z-index: 1000;
  display: flex;
  gap: 2rem;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  border-bottom-left-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #0ff;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  &.active::after {
    width: 100%;
    background-color: #0ff;
  }
`;

const NavBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setVisible(true);
      return;
    }

    // Create intersection observer to watch the about section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Show navbar when about section is in view
          setVisible(entry.isIntersecting);
        });
      },
      {
        // Trigger when the about section is 10% visible
        threshold: 0.1
      }
    );

    // Find the about section element
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, [isHomePage]);

  // Style for the navbar based on visibility
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <NavContainer
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={navVariants}
    >
      <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>
        Home
      </NavLink>
      <NavLink to="/media" className={location.pathname === "/media" ? "active" : ""}>
        Media
      </NavLink>
      <NavLink to="/team" className={location.pathname === "/team" ? "active" : ""}>
        Team
      </NavLink>
    </NavContainer>
  );
};

export default NavBar;
