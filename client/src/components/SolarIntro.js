import { useState } from 'react';

const SolarIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('dark');
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [flashBg, setFlashBg] = useState('#ffffff');

  const ignite = () => {
    setPhase('burst');

    // Solar burst — sharp white → golden yellow → green fade
    setTimeout(() => setFlashOpacity(0.25), 80);
    setTimeout(() => setFlashOpacity(0),    250);
    setTimeout(() => setFlashOpacity(0.7),  380);
    setTimeout(() => setFlashOpacity(0),    530);
    setTimeout(() => { setFlashBg('#fffbe6'); setFlashOpacity(1); }, 660);   // full white-yellow
    setTimeout(() => { setFlashBg('#a8e063'); setFlashOpacity(0.35); }, 900); // green energy
    setTimeout(() => setFlashOpacity(0), 1200);
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 1500);
  };

  if (phase === 'done') return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#04100a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '0 24px',
      fontFamily: 'Poppins, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Solar ray lines decoration */}
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #f9d42318 0%, transparent 65%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        animation: 'sunPulse 2.5s ease-in-out infinite',
      }} />

      {/* Rotating ring */}
      <div style={{
        position: 'absolute',
        width: 320,
        height: 320,
        borderRadius: '50%',
        border: '1px solid #f9d42315',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'spin 8s linear infinite',
        pointerEvents: 'none',
      }} />

      {/* Flash overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: flashBg,
        opacity: flashOpacity,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: flashOpacity === 1 ? 'none' : 'opacity 0.18s ease',
      }} />

      {phase === 'dark' && (
        <>
          <p style={{
            color: '#1a3a20',
            letterSpacing: 6,
            fontSize: 11,
            marginBottom: 20,
            textTransform: 'uppercase',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            clean · green · infinite
          </p>

          <h1 style={{
            color: '#fff',
            fontSize: 'clamp(26px, 5vw, 44px)',
            fontWeight: 900,
            lineHeight: 1.25,
            marginBottom: 10,
          }}>
            Power your world with{' '}
            <span style={{ color: '#f9d423', textShadow: '0 0 30px #f9d42388' }}>
              the sun
            </span>
            <br />
            <span style={{ color: '#555' }}>clean energy for a</span>
            <br />
            <span style={{ color: '#a8e063', textShadow: '0 0 20px #a8e06366' }}>
              brighter tomorrow.
            </span>
          </h1>

          <p style={{ color: '#555', fontSize: 13, letterSpacing: 2, marginBottom: 40 }}>
            harness the power of nature
          </p>

          <button
            onClick={ignite}
            style={{
              border: '1px solid #f9d423',
              background: 'transparent',
              color: '#f9d423',
              padding: '14px 40px',
              fontSize: 12,
              letterSpacing: 4,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'uppercase',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#f9d423';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#f9d423';
            }}
          >
            ACTIVATE SOLAR →
          </button>
        </>
      )}

      {phase === 'burst' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 20, animation: 'sunSpin 0.6s ease' }}>☀️</div>
          <h2 style={{
            color: '#f9d423',
            fontSize: 32,
            fontWeight: 900,
            textShadow: '0 0 60px #f9d423, 0 0 120px #a8e06366',
          }}>
            ENERGY UNLEASHED ✦
          </h2>
          <p style={{ color: '#a8e063', letterSpacing: 3, fontSize: 12, marginTop: 10 }}>
            CLEAN · RENEWABLE · INFINITE
          </p>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%,100% { color: #0f2a15; }
          50%      { color: #2a6a35; }
        }
        @keyframes sunPulse {
          0%,100% { transform: translate(-50%, -50%) scale(1);   opacity: 0.6; }
          50%      { transform: translate(-50%, -50%) scale(1.1); opacity: 1;   }
        }
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes sunSpin {
          0%   { transform: scale(0.3) rotate(-180deg); opacity: 0; }
          100% { transform: scale(1)   rotate(0deg);    opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SolarIntro;
