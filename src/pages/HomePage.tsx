import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Computer from '../components/Computer';
import AboutSection from '../components/AboutSection';

const HomeContainer = styled.div`
  overflow-y: auto;
  height: 100vh;
  scroll-behavior: smooth;
`;

const Section = styled.section`
  height: 100vh;
  position: relative;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  z-index: 10;
  cursor: pointer;
`;

const Arrow = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-right: 3px solid #0ff;
  border-bottom: 3px solid #0ff;
  transform: rotate(45deg);
`;

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <Section id="home">
        <Computer />
        <ScrollIndicator
          initial={{ opacity: 0.7 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Arrow />
        </ScrollIndicator>
      </Section>
      
      <AboutSection />
    </HomeContainer>
  );
};

export default HomePage;
