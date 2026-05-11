import { useState, useEffect } from 'react';

const LightsIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('dark');
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [flashBg, setFlashBg] = useState('#ffffff');

  const ignite = () => {
    setPhase('burst');

    // Flash sequence — white flashes
    setTimeout(() => setFlashOpacity(0.3), 100);
    setTimeout(() => setFlashOpacity(0),   300);
    setTimeout(() => setFlashOpacity(0.6), 450);
    setTimeout(() => setFlashOpacity(0),   600);
    setTimeout(() => setFlashOpacity(1),   750);  // 👈 full white screen
    setTimeout(() => {
      setFlashBg('#ffdd44');                       // 👈 turns yellow
      setFlashOpacity(0.4);
    }, 950);
    setTimeout(() => setFlashOpacity(0),  1200);  // 👈 fades out
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 1500);
  };

  if (phase === 'done') return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
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

      {/* 👇 Flash overlay — this is the white screen pop */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: flashBg,
        opacity: flashOpacity,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: flashOpacity === 1 ? 'none' : 'opacity 0.15s ease',
      }} />

      {phase === 'dark' && (
        <>
          <p style={{
            color: '#444', letterSpacing: 6, fontSize: 11,
            marginBottom: 20, textTransform: 'uppercase',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}>
            wait · wait · wait
          </p>
          <h1 style={{
            color: '#fff',
            fontSize: 'clamp(26px, 5vw, 44px)',
            fontWeight: 900, lineHeight: 1.25, marginBottom: 10,
          }}>
            Want to buy{' '}
            <span style={{ color: '#ffdd44', textShadow: '0 0 30px #ffdd4488' }}>
              light
            </span>
            <br />
            <span style={{ color: '#555' }}>to remove the</span>
            <br />
            darkness around you?
          </h1>
          <p style={{ color: '#555', fontSize: 13, letterSpacing: 2, marginBottom: 40 }}>
            we dare you to click this button
          </p>
          <button
            onClick={ignite}
            style={{
              border: '1px solid #ffdd44',
              background: 'transparent',
              color: '#ffdd44',
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
              e.currentTarget.style.background = '#ffdd44';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ffdd44';
            }}
          >
            TURN ON THE LIGHTS →
          </button>
        </>
      )}

      {phase === 'burst' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>💡</div>
          <h2 style={{
            color: '#ffdd44', fontSize: 32, fontWeight: 900,
            textShadow: '0 0 60px #ffdd44, 0 0 120px #ffdd44',
          }}>
            LET THERE BE LIGHT ✦
          </h2>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%,100% { color: #333; }
          50%      { color: #777; }
        }
      `}</style>
    </div>
  );
};

export default LightsIntro;