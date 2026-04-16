import React from 'react';
import SimulationPageShell from '../components/SimulationPageShell';
import DLASimulation from '../components/DLASimulation';

const DLAPage: React.FC = () => {
  return (
    <SimulationPageShell
      title="Diffusion-Limited Aggregation"
      subtitle="Random walks that freeze when they touch a growing cluster"
      description={
        <>
          <p>
            <strong>Diffusion-limited aggregation (DLA)</strong> is a simple model: particles wander randomly until they bump into an existing cluster, then they stick. Started from a tiny seed, the cluster grows into a branching, tree-like shape with a fractal feel.
          </p>
          <p>
            It shows up in electrodeposition, mineral growth, and other systems where random motion meets sticking. Use the buttons to add many particles at once and watch the structure fill in.
          </p>
        </>
      }
    >
      <DLASimulation />
    </SimulationPageShell>
  );
};

export default DLAPage;
