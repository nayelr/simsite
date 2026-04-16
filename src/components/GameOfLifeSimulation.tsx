import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const COLS = 45;
const ROWS = 35;
const CELL = 14;

const Wrap = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Panel = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Button = styled(motion.button)`
  padding: 8px 16px;
  font-size: 0.95rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #0ff;
  color: #111;
  font-weight: bold;

  &:hover {
    background-color: #00dddd;
  }
`;

const CanvasWrap = styled.div`
  border-radius: 8px;
  overflow: auto;
  border: 1px solid #333;
  background: #050505;
`;

const Hint = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-top: 0.75rem;
`;

function countNeighbors(
  g: boolean[],
  x: number,
  y: number,
  w: number,
  h: number
): number {
  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      if (g[ny * w + nx]) n++;
    }
  }
  return n;
}

const GameOfLifeSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<boolean[]>(Array.from({ length: COLS * ROWS }, () => false));
  const [playing, setPlaying] = useState(false);
  const [generation, setGeneration] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const g = gridRef.current;
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (g[y * COLS + x]) {
          ctx.fillStyle = '#00dddd';
          ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
        }
      }
    }
    ctx.strokeStyle = 'rgba(0,255,255,0.08)';
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL, 0);
      ctx.lineTo(x * CELL, ROWS * CELL);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL);
      ctx.lineTo(COLS * CELL, y * CELL);
      ctx.stroke();
    }
  }, []);

  const step = useCallback(() => {
    const g = gridRef.current;
    const next = g.slice();
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const i = y * COLS + x;
        const n = countNeighbors(g, x, y, COLS, ROWS);
        if (g[i]) {
          next[i] = n === 2 || n === 3;
        } else {
          next[i] = n === 3;
        }
      }
    }
    gridRef.current = next;
    setGeneration((g) => g + 1);
    draw();
  }, [draw]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    if (!playing) return;
    const tick = (t: number) => {
      if (t - lastRef.current >= 80) {
        lastRef.current = t;
        step();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, step]);

  const randomize = useCallback(() => {
    const g = gridRef.current;
    for (let i = 0; i < g.length; i++) g[i] = Math.random() < 0.28;
    setGeneration(0);
    draw();
  }, [draw]);

  const clear = useCallback(() => {
    gridRef.current.fill(false);
    setGeneration(0);
    draw();
  }, [draw]);

  const onCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const sx = (e.clientX - rect.left) / (rect.width / canvas.width);
      const sy = (e.clientY - rect.top) / (rect.height / canvas.height);
      const x = Math.floor(sx / CELL);
      const y = Math.floor(sy / CELL);
      if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return;
      const i = y * COLS + x;
      gridRef.current[i] = !gridRef.current[i];
      draw();
    },
    [draw]
  );

  return (
    <Wrap>
      <Panel>
        <Controls>
          <Button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {playing ? 'Pause' : 'Play'}
          </Button>
          <Button
            type="button"
            onClick={() => {
              step();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Step
          </Button>
          <Button
            type="button"
            onClick={randomize}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Random
          </Button>
          <Button
            type="button"
            onClick={clear}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Clear
          </Button>
          <span style={{ color: '#0ff', alignSelf: 'center', fontWeight: 600 }}>
            Generation {generation}
          </span>
        </Controls>
        <CanvasWrap>
          <canvas
            ref={canvasRef}
            width={COLS * CELL}
            height={ROWS * CELL}
            onClick={onCanvasClick}
            style={{
              width: '100%',
              maxWidth: COLS * CELL,
              height: 'auto',
              display: 'block',
              cursor: 'crosshair',
            }}
          />
        </CanvasWrap>
        <Hint>
          Click cells to toggle them alive or dead. Conway&apos;s rules: a live
          cell with 2–3 live neighbors survives; a dead cell with exactly 3 live
          neighbors becomes alive.
        </Hint>
      </Panel>
    </Wrap>
  );
};

export default GameOfLifeSimulation;
