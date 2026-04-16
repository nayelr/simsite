import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
`;

const Slider = styled.input`
  flex: 1;
  min-width: 180px;
  accent-color: #0ff;
`;

const Value = styled.span`
  color: #ccc;
  font-variant-numeric: tabular-nums;
  min-width: 4rem;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  color: #aaa;
  font-size: 0.95rem;
`;

const ChartBox = styled.div`
  min-height: 300px;
  margin-top: 1rem;
`;

function binomialSample(rows: number): number {
  let r = 0;
  for (let i = 0; i < rows; i++) {
    if (Math.random() < 0.5) r++;
  }
  return r;
}

function computeCounts(rows: number, drops: number): number[] {
  const bins = rows + 1;
  const c = new Array(bins).fill(0);
  for (let i = 0; i < drops; i++) {
    c[binomialSample(rows)]++;
  }
  return c;
}

const GaltonBoardSimulation: React.FC = () => {
  const [rows, setRows] = useState(16);
  const [drops, setDrops] = useState(5000);
  const [counts, setCounts] = useState<number[]>(() => computeCounts(16, 5000));

  useEffect(() => {
    const id = window.setTimeout(() => {
      setCounts(computeCounts(rows, drops));
    }, 250);
    return () => clearTimeout(id);
  }, [rows, drops]);

  const stats = useMemo(() => {
    if (!counts || counts.length === 0) return null;
    const n = counts.reduce((a, b) => a + b, 0);
    let sum = 0;
    counts.forEach((v, k) => {
      sum += k * v;
    });
    const mean = n > 0 ? sum / n : 0;
    let varSum = 0;
    counts.forEach((v, k) => {
      const d = k - mean;
      varSum += v * d * d;
    });
    const variance = n > 1 ? varSum / n : 0;
    const theoryMean = rows / 2;
    const theoryVar = rows / 4;
    return { mean, variance, n, theoryMean, theoryVar };
  }, [counts, rows]);

  const chartData = useMemo(() => {
    const labels = counts.map((_, i) => String(i));
    return {
      labels,
      datasets: [
        {
          label: 'Balls per bin',
          data: counts,
          backgroundColor: 'rgba(0, 255, 255, 0.45)',
          borderColor: 'rgba(0, 255, 255, 0.9)',
          borderWidth: 1,
        },
      ],
    };
  }, [counts]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#ccc' } },
        title: {
          display: true,
          text: 'Bins (each step goes right or left with equal probability)',
          color: '#fff',
        },
      },
      scales: {
        x: {
          title: { display: true, text: 'Bin index (number of rights)', color: '#888' },
          ticks: { color: '#888' },
          grid: { color: 'rgba(255,255,255,0.06)' },
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Count', color: '#888' },
          ticks: { color: '#888' },
          grid: { color: 'rgba(255,255,255,0.06)' },
        },
      },
    }),
    []
  );

  return (
    <Wrap>
      <Panel>
        <Row>
          <Label htmlFor="rows">Rows of pegs</Label>
          <Slider
            id="rows"
            type="range"
            min={8}
            max={32}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
          />
          <Value>{rows}</Value>
        </Row>
        <Row>
          <Label htmlFor="drops">Balls to drop</Label>
          <Slider
            id="drops"
            type="range"
            min={500}
            max={25000}
            step={500}
            value={drops}
            onChange={(e) => setDrops(Number(e.target.value))}
          />
          <Value>{drops.toLocaleString()}</Value>
        </Row>
        {stats && (
          <Stats>
            <div>
              Sample mean bin: <strong style={{ color: '#0ff' }}>{stats.mean.toFixed(2)}</strong>{' '}
              (theory {stats.theoryMean.toFixed(2)})
            </div>
            <div>
              Sample variance: <strong style={{ color: '#0ff' }}>{stats.variance.toFixed(2)}</strong>{' '}
              (theory {stats.theoryVar.toFixed(2)})
            </div>
            <div>
              Total balls: <strong style={{ color: '#0ff' }}>{stats.n}</strong>
            </div>
          </Stats>
        )}
        <ChartBox>
          <Bar data={chartData} options={options} />
        </ChartBox>
      </Panel>
    </Wrap>
  );
};

export default GaltonBoardSimulation;
