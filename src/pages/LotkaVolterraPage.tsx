import React from 'react';
import SimulationPageShell from '../components/SimulationPageShell';
import LotkaVolterraSimulation from '../components/LotkaVolterraSimulation';

const LotkaVolterraPage: React.FC = () => {
  return (
    <SimulationPageShell
      title="Predator–Prey Dynamics"
      subtitle="Lotka–Volterra: coupled differential equations for rabbits and wolves"
      description={
        <>
          <p>
            A classic <strong>predator–prey</strong> model uses two species: prey (here, rabbits) and predators (wolves). Prey reproduce, predators eat prey and reproduce, and predators die off without food.
          </p>
          <p>
            The standard Lotka–Volterra equations produce <strong>oscillating populations</strong>: more prey eventually supports more predators, which then drive prey down, and so on. The plot below uses simple Euler steps from your chosen parameters and starting populations.
          </p>
        </>
      }
    >
      <LotkaVolterraSimulation />
    </SimulationPageShell>
  );
};

export default LotkaVolterraPage;
