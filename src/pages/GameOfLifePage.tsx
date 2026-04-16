import React from 'react';
import SimulationPageShell from '../components/SimulationPageShell';
import GameOfLifeSimulation from '../components/GameOfLifeSimulation';

const GameOfLifePage: React.FC = () => {
  return (
    <SimulationPageShell
      title="Conway's Game of Life"
      subtitle="Complex patterns from two simple rules on a grid"
      description={
        <>
          <p>
            On a square grid, each cell is <strong>alive</strong> or <strong>dead</strong>. Every generation, all cells update at once using Conway&apos;s rules: a live cell with 2 or 3 live neighbors stays alive; a dead cell with exactly 3 live neighbors becomes alive; otherwise the cell dies or stays dead.
          </p>
          <p>
            Despite those rules, you can get gliders, oscillators, still lifes, and chaotic regions. Click to toggle cells, hit <strong>Play</strong> to iterate, or try <strong>Random</strong> for a quick messy start.
          </p>
        </>
      }
    >
      <GameOfLifeSimulation />
    </SimulationPageShell>
  );
};

export default GameOfLifePage;
