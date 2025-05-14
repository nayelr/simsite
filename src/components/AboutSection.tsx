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

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const AboutContent = styled.div`
  flex: 1;
  text-align: left;
  color: #fff;
  
  @media (max-width: 968px) {
    text-align: center;
  }
`;

const ImageContainer = styled(motion.div)`
  flex: 1;
  max-width: 500px;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.1);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
    pointer-events: none;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  @media (max-width: 968px) {
    width: 100%;
    height: 300px;
  }
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
      
      <ContentWrapper>
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

        <ImageContainer
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img src="/SimulationsClub2025.jpg" alt="TJ Simulations Club" />
        </ImageContainer>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default AboutSection;
