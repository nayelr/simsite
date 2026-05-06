import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { SpeedInsights } from "@vercel/speed-insights/react";
import HomePage from './pages/HomePage';
import MediaPage from './pages/MediaPage';
import TeamPage from './pages/TeamPage';
import MontyHallPage from './pages/MontyHallPage';
import BirthdayParadoxPage from './pages/BirthdayParadoxPage';
import DLAPage from './pages/DLAPage';
import LotkaVolterraPage from './pages/LotkaVolterraPage';
import GameOfLifePage from './pages/GameOfLifePage';
import GaltonBoardPage from './pages/GaltonBoardPage';
import NavBar from './components/NavBar';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  html, body {
    background-color: #000;
    color: #fff;
    overflow-x: hidden;
    scroll-behavior: smooth;
    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: #111;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #444;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/linear" element={<Navigate to="/linear/index.html" replace />} />
          <Route path="/linear/*" element={<Navigate to="/linear/index.html" replace />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/montyhall" element={<MontyHallPage />} />
          <Route path="/sim/birthday-paradox" element={<BirthdayParadoxPage />} />
          <Route path="/sim/dla" element={<DLAPage />} />
          <Route path="/sim/predator-prey" element={<LotkaVolterraPage />} />
          <Route path="/sim/game-of-life" element={<GameOfLifePage />} />
          <Route path="/sim/galton-board" element={<GaltonBoardPage />} />
        </Routes>
        <SpeedInsights />
      </div>
    </Router>
  );
}

export default App;
