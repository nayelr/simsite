import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TextContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  perspective: 1000px;
`;

const TextWrapper = styled(motion.div)`
  position: absolute;
  will-change: transform;
  user-select: none;
  pointer-events: none;
`;

const TextContent = styled(motion.h1)`
  font-size: 8rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 0 30px rgba(0, 255, 255, 0.8), 0 0 50px rgba(0, 200, 255, 0.7), 0 0 80px rgba(0, 180, 255, 0.5);
  margin: 0;
  white-space: nowrap;
  letter-spacing: -0.05em;
  transform-origin: center;
  line-height: 0.9;

  /* Responsive text sizes */
  @media (max-width: 1024px) {
    font-size: 6rem;
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 35px rgba(0, 200, 255, 0.7), 0 0 60px rgba(0, 180, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 4rem;
    text-shadow: 0 0 15px rgba(0, 255, 255, 0.8), 0 0 25px rgba(0, 200, 255, 0.7), 0 0 40px rgba(0, 180, 255, 0.5);
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 200, 255, 0.7), 0 0 30px rgba(0, 180, 255, 0.5);
  }
`;

// Constants for animation
const SPEED_TJ = 1.5;  // Speed for "tj sim"
const SPEED_WED = 1.5; // Speed for "wed 8a"
const ROTATION_SPEED = 0.1;

const InteractiveText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tjSimRef = useRef<HTMLDivElement>(null);
  const wed8aRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Store animation state in refs to avoid re-renders
  const tjSim = useRef({
    position: { x: -100, y: -50 },
    velocity: { x: 1, y: 1 },
    rotation: 0,
    rotationVelocity: ROTATION_SPEED,
    size: { width: 0, height: 0 }
  });
  
  const wed8a = useRef({
    position: { x: 100, y: 50 },
    velocity: { x: -1, y: -1 },
    rotation: 0,
    rotationVelocity: -ROTATION_SPEED,
    size: { width: 0, height: 0 }
  });
  
  // Normalize velocity to maintain constant speed
  const normalizeVelocity = (velocity: {x: number, y: number}, speed: number) => {
    const magnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    if (magnitude < 0.001) return { x: speed, y: 0 };
    
    return {
      x: (velocity.x / magnitude) * speed,
      y: (velocity.y / magnitude) * speed
    };
  };
  
  // Initialize animation
  useEffect(() => {
    const initializeText = () => {
      // Random positions within view
      tjSim.current.position = {
        x: Math.random() * 300 - 150,
        y: Math.random() * 200 - 100
      };
      
      wed8a.current.position = {
        x: Math.random() * 300 - 150,
        y: Math.random() * 200 - 100
      };
      
      // Random directions but normalized to constant speed
      let tjVel = {
        x: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.5 + 0.5),
        y: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.5 + 0.5)
      };
      
      let wedVel = {
        x: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.5 + 0.5),
        y: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.5 + 0.5)
      };
      
      // Normalize to constant speeds
      tjSim.current.velocity = normalizeVelocity(tjVel, SPEED_TJ);
      wed8a.current.velocity = normalizeVelocity(wedVel, SPEED_WED);
      
      // Get element dimensions after they've rendered
      setTimeout(() => {
        if (tjSimRef.current && wed8aRef.current) {
          tjSim.current.size = {
            width: tjSimRef.current.offsetWidth,
            height: tjSimRef.current.offsetHeight
          };
          
          wed8a.current.size = {
            width: wed8aRef.current.offsetWidth,
            height: wed8aRef.current.offsetHeight
          };
        }
        
        // Apply initial positions
        updatePositions();
        
        // Start animation
        startAnimation();
      }, 100);
    };
    
    initializeText();
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Update element positions
  const updatePositions = () => {
    if (tjSimRef.current && wed8aRef.current) {
      tjSimRef.current.style.transform = `translate3d(${tjSim.current.position.x}px, ${tjSim.current.position.y}px, 0) rotate(${tjSim.current.rotation}deg)`;
      wed8aRef.current.style.transform = `translate3d(${wed8a.current.position.x}px, ${wed8a.current.position.y}px, 0) rotate(${wed8a.current.rotation}deg)`;
    }
  };
  
  // Main animation loop
  const animate = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    // Process tj sim
    processBounce(tjSim.current, containerWidth, containerHeight, SPEED_TJ);
    
    // Process wed 8a
    processBounce(wed8a.current, containerWidth, containerHeight, SPEED_WED);
    
    // Update DOM elements
    updatePositions();
    
    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  // Start animation loop
  const startAnimation = () => {
    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };
  
  // Handle wall bounce for a text element
  const processBounce = (
    text: { 
      position: { x: number, y: number },
      velocity: { x: number, y: number },
      rotation: number,
      rotationVelocity: number,
      size: { width: number, height: number }
    },
    containerWidth: number,
    containerHeight: number,
    speed: number
  ) => {
    // Ensure constant speed
    text.velocity = normalizeVelocity(text.velocity, speed);
    
    // Update position
    text.position.x += text.velocity.x;
    text.position.y += text.velocity.y;
    
    // Update rotation
    text.rotation += text.rotationVelocity;
    
    // Calculate bounds
    const maxX = containerWidth / 2 - text.size.width / 2;
    const minX = -maxX;
    const maxY = containerHeight / 2 - text.size.height / 2;
    const minY = -maxY;
    
    // Handle horizontal wall bounce
    if (text.position.x > maxX) {
      text.position.x = maxX;
      text.velocity.x = -Math.abs(text.velocity.x);
      text.rotationVelocity = -text.rotationVelocity;
    } else if (text.position.x < minX) {
      text.position.x = minX;
      text.velocity.x = Math.abs(text.velocity.x);
      text.rotationVelocity = -text.rotationVelocity;
    }
    
    // Handle vertical wall bounce
    if (text.position.y > maxY) {
      text.position.y = maxY;
      text.velocity.y = -Math.abs(text.velocity.y);
      text.rotationVelocity = -text.rotationVelocity;
    } else if (text.position.y < minY) {
      text.position.y = minY;
      text.velocity.y = Math.abs(text.velocity.y);
      text.rotationVelocity = -text.rotationVelocity;
    }
  };
  
  return (
    <TextContainer ref={containerRef}>
      <TextWrapper ref={tjSimRef}>
        <TextContent>tj sim</TextContent>
      </TextWrapper>
      <TextWrapper ref={wed8aRef}>
        <TextContent>wed 8a</TextContent>
      </TextWrapper>
    </TextContainer>
  );
};

export default InteractiveText;
