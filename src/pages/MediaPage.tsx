import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #111;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ContentContainer = styled(motion.div)`
  text-align: center;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #fff;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #0ff;
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 3rem;
`;

const SocialLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(0, 255, 255, 0.05));
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  color: #0ff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 12px rgba(0, 255, 255, 0.1);

  &:hover {
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.1));
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 255, 255, 0.2);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const MediaPage: React.FC = () => {
  return (
    <PageContainer>
      <ContentContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Media Gallery
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Under Development
        </Subtitle>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          We're working on bringing you an exciting collection of our simulations, 
          projects, and club activities. Check back soon!
        </Description>
        <SocialLink 
          href="https://www.instagram.com/tjsimulationsclub/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Follow us on Instagram
        </SocialLink>
      </ContentContainer>
    </PageContainer>
  );
};

export default MediaPage;
