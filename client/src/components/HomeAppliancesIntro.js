import { useState } from 'react';

const HomeAppliancesIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('dark');
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [flashBg, setFlashBg] = useState('#ffffff');

  const ignite = () => {
    setPhase('burst');

    // Warm pulse flashes — orange/amber tones
    setTimeout(() => setFlashOpacity(0.2), 100);
    setTimeout(() => setFlashOpacity(0),   280);
    setTimeout(() => setFlashOpacity(0.5), 420);
    setTimeout(() => setFlashOpacity(0),   580);
    setTimeout(() => { setFlashBg('#ff6b2b'); setFlashOpacity(0.8); }, 720);
    setTimeout(() => { setFlashBg('#ffaa55'); setFlashOpacity(0.4); }, 950);
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
      background: '#0d0705',
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

      {/* Warm glow background */}
      <div style={{
        position: 'absolute',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #ff6b2b18 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
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
        transition: flashOpacity === 0.8 ? 'none' : 'opacity 0.18s ease',
      }} />

      {phase === 'dark' && (
        <>
          <p style={{
            color: '#4a2e1a',
            letterSpacing: 6,
            fontSize: 11,
            marginBottom: 20,
            textTransform: 'uppercase',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}>
            comfort · warmth · home
          </p>

          <h1 style={{
            color: '#fff',
            fontSize: 'clamp(26px, 5vw, 44px)',
            fontWeight: 900,
            lineHeight: 1.25,
            marginBottom: 10,
          }}>
            Your home deserves{' '}
            <span style={{ color: '#ff6b2b', textShadow: '0 0 30px #ff6b2b88' }}>
              the best
            </span>
            <br />
            <span style={{ color: '#555' }}>appliances that</span>
            <br />
            make life easier.
          </h1>

          <p style={{ color: '#555', fontSize: 13, letterSpacing: 2, marginBottom: 40 }}>
            step inside your dream home
          </p>

          <button
            onClick={ignite}
            style={{
              border: '1px solid #ff6b2b',
              background: 'transparent',
              color: '#ff6b2b',
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
              e.currentTarget.style.background = '#ff6b2b';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ff6b2b';
            }}
          >
            ENTER YOUR HOME →
          </button>
        </>
      )}

      {phase === 'burst' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 20, animation: 'popIn 0.3s ease' }}>🏠</div>
          <h2 style={{
            color: '#ff6b2b',
            fontSize: 32,
            fontWeight: 900,
            textShadow: '0 0 60px #ff6b2b, 0 0 120px #ffaa5588',
          }}>
            WELCOME HOME ✦
          </h2>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%,100% { color: #3a1e0a; }
          50%      { color: #7a4a2a; }
        }
        @keyframes popIn {
          0%   { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HomeAppliancesIntro;
