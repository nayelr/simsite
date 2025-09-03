import React from 'react';

type Player = {
  name: string;
};

const varsityStarting: Player[] = [
  { name: 'Ashwin' },
  { name: 'Amrit' },
  { name: 'Aadi' },
  { name: 'Faraaz' }
];

const varsityBench: Player[] = [
  { name: 'Nayel' },
  { name: 'Arhan' }
];

const jvRoster: Player[] = [
  { name: 'Will' },
  { name: 'Akhil' },
  { name: 'Rishi' },
  { name: 'Tendy' }
];

const jvBench: Player[] = [
  { name: 'Pujari' },
  { name: 'Pranav' }
];

const SpikeballPage: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0b0b0b 0%, #151515 100%)',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      padding: '24px'
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: 32, margin: 0, fontWeight: 700 }}>Spikeball Rankings</h1>
        <p style={{ opacity: 0.75, marginTop: 8, marginBottom: 24 }}>Varsity and JV rosters</p>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 24, marginBottom: 12 }}>Varsity</h2>
          <h3 style={{ fontSize: 16, opacity: 0.8, marginBottom: 8 }}>Starting lineup</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 12 }}>
            {varsityStarting.map((player, index) => (
              <li key={player.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                marginBottom: 8
              }}>
                <span style={{ width: 24, textAlign: 'right', opacity: 0.7, fontVariantNumeric: 'tabular-nums' }}>{index + 1}</span>
                <span style={{ fontWeight: 600 }}>{player.name}</span>
              </li>
            ))}
          </ul>

          <h3 style={{ fontSize: 16, opacity: 0.8, margin: '12px 0 8px' }}>Bench</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {varsityBench.map((player) => (
              <li key={player.name} style={{
                padding: '8px 10px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontWeight: 600
              }}>{player.name}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 24, marginBottom: 12 }}>JV</h2>
          <h3 style={{ fontSize: 16, opacity: 0.8, marginBottom: 8 }}>Starting lineup</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {jvRoster.map((player, index) => (
              <li key={player.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                marginBottom: 8
              }}>
                <span style={{ width: 24, textAlign: 'right', opacity: 0.7, fontVariantNumeric: 'tabular-nums' }}>{index + 1}</span>
                <span style={{ fontWeight: 600 }}>{player.name}</span>
              </li>
            ))}
          </ul>

          <h3 style={{ fontSize: 16, opacity: 0.8, margin: '12px 0 8px' }}>Bench</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {jvBench.map((player) => (
              <li key={player.name} style={{
                padding: '8px 10px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontWeight: 600
              }}>{player.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SpikeballPage;


