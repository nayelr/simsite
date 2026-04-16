import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

  strong {
    color: #e0ffff;
  }

  a {
    color: #0ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

type SimulationPageShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  description: React.ReactNode;
};

const SimulationPageShell: React.FC<SimulationPageShellProps> = ({
  title,
  subtitle,
  description,
  children,
}) => {
  return (
    <PageContainer>
      <ContentContainer>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </Subtitle>

        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {description}
        </Description>

        {children}
      </ContentContainer>
    </PageContainer>
  );
};

export default SimulationPageShell;
