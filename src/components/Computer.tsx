import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import InteractiveText from './InteractiveText';

const ComputerContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0a0a0a;
  overflow: hidden;
  padding: 0;
  margin: 0;
`;

const ComputerFrame = styled.div`
  position: relative;
  width: 85vw;
  height: 80vh;
  background-color: #1e1e1e;
  border-radius: 20px;
  padding: 18px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  max-width: 1600px;
  border: 2px solid #333;
`;

const ComputerScreen = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #444;
`;

const ComputerBase = styled.div`
  width: 40%;
  height: 25px;
  background-color: #1e1e1e;
  margin: 0 auto;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  border: 2px solid #333;
  border-top: none;
`;





const Computer: React.FC = () => {
  return (
    <ComputerContainer>
      <div>
        <ComputerFrame>
          <ComputerScreen>
            <InteractiveText />
          </ComputerScreen>

        </ComputerFrame>
        <ComputerBase />
      </div>
    </ComputerContainer>
  );
};

export default Computer;
