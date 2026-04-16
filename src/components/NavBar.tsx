import React, { useState, useEffect, useRef } from 'react';
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
  align-items: flex-start;
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

const DropdownWrap = styled.div`
  position: relative;
  padding: 0.5rem 0;
`;

const DropdownButton = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${(p) => (p.$active ? '100%' : '0')};
    height: 2px;
    background-color: #0ff;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.35rem;
  min-width: 260px;
  background: rgba(18, 18, 18, 0.98);
  border: 1px solid #333;
  border-radius: 10px;
  padding: 0.4rem 0;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 0.55rem 1.15rem;
  color: #e8e8e8;
  text-decoration: none;
  font-size: 0.98rem;
  font-weight: 450;

  &:hover {
    background: rgba(0, 255, 255, 0.08);
    color: #0ff;
  }

  &.active {
    color: #0ff;
    background: rgba(0, 255, 255, 0.06);
  }
`;

const MENU_ITEMS: { label: string; to: string }[] = [
  { label: 'Monty Hall', to: '/montyhall' },
  { label: 'Birthday paradox', to: '/sim/birthday-paradox' },
  { label: 'Diffusion-limited aggregation', to: '/sim/dla' },
  { label: 'Predator–prey (Lotka–Volterra)', to: '/sim/predator-prey' },
  { label: "Conway's Game of Life", to: '/sim/game-of-life' },
  { label: 'Galton board / CLT', to: '/sim/galton-board' },
];

const SIM_PATHS = new Set(MENU_ITEMS.map((m) => m.to));

const NavBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

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

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  const tryItActive = SIM_PATHS.has(location.pathname);

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
      <DropdownWrap ref={dropdownRef}>
        <DropdownButton
          type="button"
          $active={tryItActive}
          aria-expanded={menuOpen}
          aria-haspopup="true"
          onClick={() => setMenuOpen((o) => !o)}
        >
          Try it ▾
        </DropdownButton>
        {menuOpen && (
          <DropdownMenu
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
          >
            {MENU_ITEMS.map((item) => (
              <DropdownLink
                key={item.to}
                to={item.to}
                className={location.pathname === item.to ? "active" : ""}
              >
                {item.label}
              </DropdownLink>
            ))}
          </DropdownMenu>
        )}
      </DropdownWrap>
    </NavContainer>
  );
};

export default NavBar;
