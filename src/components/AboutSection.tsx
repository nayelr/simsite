import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  background-color: #111;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
`;

const AboutContent = styled.div`
  max-width: 800px;
  text-align: center;
  color: #fff;
  position: relative;
  z-index: 2;
`;

const AboutTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #fff;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
`;

const AboutText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #ddd;
`;

const CallToAction = styled(motion.div)`
  margin-top: 3rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #0ff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
`;

const GlowingOrb = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 70%);
  z-index: 0;
  opacity: 0.5;
`;

const AboutSection: React.FC = () => {
  return (
    <AboutContainer id="about">
      <GlowingOrb
        animate={{
          x: [50, -50, 30, -30, 50],
          y: [30, -30, 50, -50, 30],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <AboutContent>
        <AboutTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          About Simulations Club
        </AboutTitle>
        
        <AboutText
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Thomas Jefferson High School For Science and Technology's simulations club 
          builds computer programs and other programmable simulations and games 
          that help us gain a greater understanding of the world around us and 
          the processes that govern our lives.
        </AboutText>
        
        <AboutText
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Want to improve your understanding of the world around you, strengthen 
          your resume, and network with like-minded individuals? Show up to a meeting!
        </AboutText>
        
        <CallToAction
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          We meet every Wednesday A to discuss our findings and share our work.
        </CallToAction>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutSection;
