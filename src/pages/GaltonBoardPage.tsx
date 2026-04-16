import React from 'react';
import SimulationPageShell from '../components/SimulationPageShell';
import GaltonBoardSimulation from '../components/GaltonBoardSimulation';

const GaltonBoardPage: React.FC = () => {
  return (
    <SimulationPageShell
      title="Galton Board & the Central Limit Theorem"
      subtitle="Many small random choices add up to a bell-shaped histogram"
      description={
        <>
          <p>
            Imagine a ball falling through rows of pegs; at each peg it goes <strong>left or right</strong> with equal probability. After <em>n</em> rows, the ball lands in one of <em>n + 1</em> bins. The number of &quot;rights&quot; along the way is binomial — and for large <em>n</em>, the histogram of many balls looks like a <strong>normal curve</strong>.
          </p>
          <p>
            That is the <strong>Central Limit Theorem</strong> in action: sums of many independent random bits tend toward a Gaussian. Adjust rows and sample size; the chart updates after a short pause. Compare the sample mean and variance to the theoretical values for a fair coin flip at each row.
          </p>
        </>
      }
    >
      <GaltonBoardSimulation />
    </SimulationPageShell>
  );
};

export default GaltonBoardPage;
