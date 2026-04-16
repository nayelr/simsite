import React, { useCallback, useMemo, useState } from 'react';
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
  margin-bottom: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  color: #0ff;
  font-weight: 600;
  min-width: 140px;
`;

const Slider = styled.input`
  flex: 1;
  min-width: 200px;
  accent-color: #0ff;
`;

const Value = styled.span`
  color: #ccc;
  font-variant-numeric: tabular-nums;
  min-width: 3rem;
`;

const Button = styled(motion.button)`
  padding: 10px 24px;
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
    color: #aaa;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const Stat = styled.div`
  background: rgba(0, 255, 255, 0.08);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0ff;
  font-variant-numeric: tabular-nums;
`;

const Hint = styled.p`
  color: #888;
  font-size: 0.95rem;
  margin-top: 0.5rem;
`;

function randomBirthday(): number {
  return Math.floor(Math.random() * 365);
}

function hasCollision(days: number[]): boolean {
  const seen = new Set<number>();
  for (const d of days) {
    if (seen.has(d)) return true;
    seen.add(d);
  }
  return false;
}

/** P(no collision) for n people, 365 equally likely birthdays */
function theoreticalNoMatch(n: number): number {
  if (n <= 1) return 1;
  let p = 1;
  for (let i = 1; i < n; i++) {
    p *= (365 - i) / 365;
  }
  return p;
}

const BirthdayParadoxSimulation: React.FC = () => {
  const [n, setN] = useState(23);
  const [trials, setTrials] = useState(5000);
  const [running, setRunning] = useState(false);
  const [collisions, setCollisions] = useState<number | null>(null);
  const [totalRuns, setTotalRuns] = useState(0);

  const theory = useMemo(() => {
    const pNo = theoreticalNoMatch(n);
    return {
      pAtLeastOne: 1 - pNo,
      pNo,
    };
  }, [n]);

  const run = useCallback(() => {
    setRunning(true);
    let hits = 0;
    for (let t = 0; t < trials; t++) {
      const birthdays: number[] = [];
      for (let i = 0; i < n; i++) birthdays.push(randomBirthday());
      if (hasCollision(birthdays)) hits++;
    }
    setCollisions(hits);
    setTotalRuns(trials);
    setRunning(false);
  }, [n, trials]);

  const empirical =
    collisions === null ? null : collisions / Math.max(totalRuns, 1);

  return (
    <Wrap>
      <Panel>
        <Row>
          <Label htmlFor="people">People in the room</Label>
          <Slider
            id="people"
            type="range"
            min={2}
            max={60}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
          <Value>{n}</Value>
        </Row>
        <Row>
          <Label htmlFor="trials">Trials per run</Label>
          <Slider
            id="trials"
            type="range"
            min={500}
            max={20000}
            step={500}
            value={trials}
            onChange={(e) => setTrials(Number(e.target.value))}
          />
          <Value>{trials.toLocaleString()}</Value>
        </Row>
        <Row>
          <Button
            type="button"
            onClick={run}
            disabled={running}
            whileHover={!running ? { scale: 1.02 } : {}}
            whileTap={!running ? { scale: 0.98 } : {}}
          >
            {running ? 'Running…' : 'Run simulation'}
          </Button>
        </Row>
        <Hint>
          Each trial assigns {n} random birthdays (365 days, uniform). We count
          how often at least two people share a birthday.
        </Hint>
      </Panel>

      <Panel>
        <StatGrid>
          <Stat>
            <StatLabel>Theoretical P(at least one match)</StatLabel>
            <StatValue>{(theory.pAtLeastOne * 100).toFixed(2)}%</StatValue>
          </Stat>
          <Stat>
            <StatLabel>Empirical (last run)</StatLabel>
            <StatValue>
              {empirical === null ? '—' : `${(empirical * 100).toFixed(2)}%`}
            </StatValue>
          </Stat>
          <Stat>
            <StatLabel>Matches in last run</StatLabel>
            <StatValue>
              {collisions === null ? '—' : `${collisions} / ${totalRuns}`}
            </StatValue>
          </Stat>
        </StatGrid>
      </Panel>
    </Wrap>
  );
};

export default BirthdayParadoxSimulation;
