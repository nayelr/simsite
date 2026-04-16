import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Panel = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

const SliderRow = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr 48px;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.span`
  color: #0ff;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Slider = styled.input`
  width: 100%;
  accent-color: #0ff;
`;

const Value = styled.span`
  color: #ccc;
  font-variant-numeric: tabular-nums;
  text-align: right;
`;

const ChartBox = styled.div`
  min-height: 320px;
  margin-top: 1rem;
`;

type Params = {
  alpha: number;
  beta: number;
  gamma: number;
  delta: number;
};

function integrate(
  u0: number,
  v0: number,
  p: Params,
  steps: number,
  dt: number
): { u: number[]; v: number[] } {
  const u: number[] = [u0];
  const v: number[] = [v0];
  let ui = u0;
  let vi = v0;
  for (let i = 0; i < steps; i++) {
    const du = p.alpha * ui - p.beta * ui * vi;
    const dv = p.delta * ui * vi - p.gamma * vi;
    ui += du * dt;
    vi += dv * dt;
    ui = Math.max(0, ui);
    vi = Math.max(0, vi);
    u.push(ui);
    v.push(vi);
  }
  return { u, v };
}

const LotkaVolterraSimulation: React.FC = () => {
  const [alpha, setAlpha] = useState(0.6);
  const [beta, setBeta] = useState(0.08);
  const [gamma, setGamma] = useState(0.4);
  const [delta, setDelta] = useState(0.02);
  const [u0, setU0] = useState(40);
  const [v0, setV0] = useState(9);
  const [steps, setSteps] = useState(2000);

  const series = useMemo(() => {
    const p: Params = { alpha, beta, gamma, delta };
    return integrate(u0, v0, p, steps, 0.05);
  }, [alpha, beta, gamma, delta, u0, v0, steps]);

  const chartData = useMemo(() => {
    const n = series.u.length;
    const stride = Math.max(1, Math.floor(n / 400));
    const indices: number[] = [];
    for (let i = 0; i < n; i += stride) indices.push(i);
    return {
      labels: indices.map((i) => String(i)),
      datasets: [
        {
          label: 'Prey (rabbits)',
          data: indices.map((i) => series.u[i]),
          borderColor: 'rgba(0, 255, 255, 0.9)',
          backgroundColor: 'rgba(0, 255, 255, 0.15)',
          pointRadius: 0,
          tension: 0.15,
        },
        {
          label: 'Predators (wolves)',
          data: indices.map((i) => series.v[i]),
          borderColor: 'rgba(255, 180, 80, 0.95)',
          backgroundColor: 'rgba(255, 180, 80, 0.12)',
          pointRadius: 0,
          tension: 0.15,
        },
      ],
    };
  }, [series]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index' as const, intersect: false },
      plugins: {
        legend: {
          labels: { color: '#ccc' },
        },
        title: {
          display: true,
          text: 'Populations over time (Euler integration)',
          color: '#fff',
        },
      },
      scales: {
        x: {
          ticks: { color: '#888', maxTicksLimit: 12 },
          grid: { color: 'rgba(255,255,255,0.06)' },
        },
        y: {
          beginAtZero: true,
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
        <SliderRow>
          <Label>α (prey growth)</Label>
          <Slider
            type="range"
            min={0.05}
            max={1.2}
            step={0.01}
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
          />
          <Value>{alpha.toFixed(2)}</Value>
        </SliderRow>
        <SliderRow>
          <Label>β (predation)</Label>
          <Slider
            type="range"
            min={0.01}
            max={0.2}
            step={0.005}
            value={beta}
            onChange={(e) => setBeta(Number(e.target.value))}
          />
          <Value>{beta.toFixed(3)}</Value>
        </SliderRow>
        <SliderRow>
          <Label>γ (predator death)</Label>
          <Slider
            type="range"
            min={0.1}
            max={1}
            step={0.01}
            value={gamma}
            onChange={(e) => setGamma(Number(e.target.value))}
          />
          <Value>{gamma.toFixed(2)}</Value>
        </SliderRow>
        <SliderRow>
          <Label>δ (predator growth)</Label>
          <Slider
            type="range"
            min={0.005}
            max={0.08}
            step={0.001}
            value={delta}
            onChange={(e) => setDelta(Number(e.target.value))}
          />
          <Value>{delta.toFixed(3)}</Value>
        </SliderRow>
        <SliderRow>
          <Label>Initial prey u₀</Label>
          <Slider
            type="range"
            min={5}
            max={120}
            step={1}
            value={u0}
            onChange={(e) => setU0(Number(e.target.value))}
          />
          <Value>{u0}</Value>
        </SliderRow>
        <SliderRow>
          <Label>Initial predators v₀</Label>
          <Slider
            type="range"
            min={1}
            max={40}
            step={1}
            value={v0}
            onChange={(e) => setV0(Number(e.target.value))}
          />
          <Value>{v0}</Value>
        </SliderRow>
        <SliderRow>
          <Label>Time steps</Label>
          <Slider
            type="range"
            min={500}
            max={8000}
            step={100}
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
          />
          <Value>{steps}</Value>
        </SliderRow>
        <ChartBox>
          <Line data={chartData} options={options} />
        </ChartBox>
      </Panel>
    </Wrap>
  );
};

export default LotkaVolterraSimulation;
