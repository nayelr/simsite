import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrap = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Panel = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #0ff;
  color: #111;
  font-weight: bold;

  &:hover {
    background-color: #00dddd;
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const CanvasWrap = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
  background: #0a0a0a;
`;

const Hint = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-top: 0.75rem;
`;

const GRID = 201;
const CENTER = (GRID - 1) / 2;

const DLASimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clusterRef = useRef<Uint8Array>(new Uint8Array(GRID * GRID));
  const [particleCount, setParticleCount] = useState(0);
  const [running, setRunning] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = clusterRef.current;
    const scale = canvas.width / GRID;
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        if (data[y * GRID + x]) {
          const t = y / GRID;
          ctx.fillStyle = `rgb(0, ${180 + Math.floor(75 * t)}, ${220 - Math.floor(40 * t)})`;
          ctx.fillRect(x * scale, y * scale, scale + 0.5, scale + 0.5);
        }
      }
    }
  }, []);

  const reset = useCallback(() => {
    clusterRef.current.fill(0);
    clusterRef.current[CENTER * GRID + CENTER] = 1;
    setParticleCount(1);
    requestAnimationFrame(draw);
  }, [draw]);

  useEffect(() => {
    reset();
  }, [reset]);

  const tryStick = useCallback(
    (x: number, y: number, data: Uint8Array): boolean => {
      const neighbors = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ];
      for (const [nx, ny] of neighbors) {
        if (nx < 0 || nx >= GRID || ny < 0 || ny >= GRID) continue;
        if (data[ny * GRID + nx]) return true;
      }
      return false;
    },
    []
  );

  const stepWalker = useCallback(() => {
    const data = clusterRef.current;
    let x: number;
    let y: number;
    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) {
      x = Math.floor(Math.random() * GRID);
      y = 0;
    } else if (edge === 1) {
      x = GRID - 1;
      y = Math.floor(Math.random() * GRID);
    } else if (edge === 2) {
      x = Math.floor(Math.random() * GRID);
      y = GRID - 1;
    } else {
      x = 0;
      y = Math.floor(Math.random() * GRID);
    }

    const maxSteps = GRID * GRID * 2;
    for (let s = 0; s < maxSteps; s++) {
      if (tryStick(x, y, data)) {
        data[y * GRID + x] = 1;
        setParticleCount((c) => c + 1);
        return true;
      }
      const d = Math.floor(Math.random() * 4);
      if (d === 0) x++;
      else if (d === 1) x--;
      else if (d === 2) y++;
      else y--;
      if (x < 0 || x >= GRID || y < 0 || y >= GRID) return false;
    }
    return false;
  }, [tryStick]);

  const burst = useCallback(
    (count: number) => {
      setRunning(true);
      for (let i = 0; i < count; i++) {
        stepWalker();
      }
      draw();
      setRunning(false);
    },
    [draw, stepWalker]
  );

  return (
    <Wrap>
      <Panel>
        <Controls>
          <Button
            type="button"
            onClick={reset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reset
          </Button>
          <Button
            type="button"
            disabled={running}
            onClick={() => burst(200)}
            whileHover={!running ? { scale: 1.02 } : {}}
            whileTap={!running ? { scale: 0.98 } : {}}
          >
            Add 200 particles
          </Button>
          <Button
            type="button"
            disabled={running}
            onClick={() => burst(2000)}
            whileHover={!running ? { scale: 1.02 } : {}}
            whileTap={!running ? { scale: 0.98 } : {}}
          >
            Add 2000 particles
          </Button>
          <span style={{ color: '#0ff', fontWeight: 600 }}>
            Cluster size: {particleCount}
          </span>
        </Controls>
        <CanvasWrap>
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            style={{ width: '100%', maxWidth: 600, height: 'auto', display: 'block' }}
          />
        </CanvasWrap>
        <Hint>
          Walkers start from a random edge and perform a random walk until they
          touch the growing cluster; then they stick. The seed is a single pixel
          at the center.
        </Hint>
      </Panel>
    </Wrap>
  );
};

export default DLASimulation;
