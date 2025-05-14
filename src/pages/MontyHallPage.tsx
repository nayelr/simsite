import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MontyHallSimulation from '../components/MontyHallSimulation';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #111;
  color: white;
  padding: 6rem 2rem 2rem 2rem;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fff;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  text-align: center;
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #0ff;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Description = styled(motion.div)`
  font-size: 1.1rem;
  margin-bottom: 3rem;
  line-height: 1.6;
  color: #ccc;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  p {
    margin-bottom: 1rem;
  }
  
  a {
    color: #0ff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MontyHallPage: React.FC = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <Title 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Monty Hall Problem
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A classic probability puzzle that challenges our intuition
        </Subtitle>
        
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p>
            Imagine you're on a game show, and you're given the choice of three doors. Behind one door is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors, opens another door, say No. 3, which has a goat. He then says to you, "Do you want to pick door No. 2?"
          </p>
          <p>
            <strong>Is it to your advantage to switch your choice?</strong> Most people intuitively feel that it doesn't matter whether you switch or not, believing the probability is 50/50. However, mathematically, switching gives you a 2/3 chance of winning, while staying gives you only a 1/3 chance.
          </p>
          <p>
            Try it yourself in the simulation below and run multiple trials to see the results. The more simulations you run, the closer the results will get to the theoretical probabilities.
          </p>
        </Description>
        
        <MontyHallSimulation />
      </ContentContainer>
    </PageContainer>
  );
};

export default MontyHallPage; 