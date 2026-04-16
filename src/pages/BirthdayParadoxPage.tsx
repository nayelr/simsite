import React from 'react';
import SimulationPageShell from '../components/SimulationPageShell';
import BirthdayParadoxSimulation from '../components/BirthdayParadoxSimulation';

const BirthdayParadoxPage: React.FC = () => {
  return (
    <SimulationPageShell
      title="Birthday Paradox"
      subtitle="Shared birthdays are much more likely than most people expect"
      description={
        <>
          <p>
            In a group of people, what is the chance that <strong>at least two</strong> share the same birthday (month and day)? If you assume birthdays are uniformly distributed and ignore leap years, the math is surprisingly friendly to work with.
          </p>
          <p>
            With only <strong>23</strong> people, the probability of a match is already about <strong>50%</strong>. With 57 people it exceeds 99%. The simulation below estimates the probability for any group size by brute force: each trial picks random birthdays and checks for a collision.
          </p>
        </>
      }
    >
      <BirthdayParadoxSimulation />
    </SimulationPageShell>
  );
};

export default BirthdayParadoxPage;
