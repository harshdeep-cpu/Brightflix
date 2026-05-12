// import React from 'react';

// const Contact = () => {
//   const cards = [
//     {
//       icon: '💬',
//       iconBg: 'rgba(37,211,102,0.12)',
//       iconBorder: 'rgba(37,211,102,0.25)',
//       title: 'WhatsApp Support',
//       desc: 'Get instant support through WhatsApp anytime',
//       btnClass: 'cr-btn-wa',
//       btnText: '💬 Chat with Us',
//       action: () => window.open('https://wa.me/918000121313', '_blank'),
//     },
//     {
//       icon: '📞',
//       iconBg: 'rgba(244,127,31,0.12)',
//       iconBorder: 'rgba(244,127,31,0.25)',
//       title: 'Call Us',
//       desc: 'Available Monday to Saturday, 10am – 6pm IST',
//       btnClass: 'cr-btn-call',
//       btnText: '📞 +91 8000121313',
//       action: () => window.open('tel:+918000121313'),
//     },
//     {
//       icon: '✉️',
//       iconBg: 'rgba(244,127,31,0.12)',
//       iconBorder: 'rgba(244,127,31,0.25)',
//       title: 'Email Us',
//       desc: 'Send us your queries anytime, we reply within 24h',
//       btnClass: 'cr-btn-mail',
//       btnText: '✉️ Send Email',
//       action: () => window.open('mailto:support@brightflix.in'),
//     },
//   ];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;900&display=swap');

//         .cr-root {
//           font-family: 'Space Grotesk', 'Poppins', sans-serif;
//           min-height: 100vh;
//           position: relative;
//           overflow: hidden;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 60px 20px;
//           background: #fdf8f3;
//         }

//         .cr-bg {
//           position: absolute; inset: 0;
//           background: radial-gradient(ellipse at 50% 80%, rgba(244,127,31,0.06) 0%, transparent 65%);
//         }

//         /* appliances */
//         .cr-fridge {
//           position: absolute; left: 2%; bottom: 20%;
//           width: 62px; height: 170px;
//           background: #1a1206; border: 1px solid #2a1e0a;
//           border-radius: 4px 4px 2px 2px;
//         }
//         .cr-fridge::before {
//           content: ''; position: absolute; top: 10px; right: 7px;
//           width: 4px; height: 32px;
//           background: rgba(244,127,31,0.18); border-radius: 3px;
//         }
//         .cr-fridge::after {
//           content: ''; position: absolute; top: 48%;
//           left: 0; right: 0; height: 1px; background: #2a1e0a;
//         }

//         .cr-micro {
//           position: absolute; left: 10%; bottom: 42%;
//           width: 68px; height: 44px;
//           background: #1a1206; border: 1px solid #2a1e0a; border-radius: 3px;
//         }
//         .cr-micro::before {
//           content: ''; position: absolute; top: 7px; left: 7px;
//           width: 38px; height: 30px;
//           background: #0d0800; border: 1px solid rgba(244,127,31,0.08); border-radius: 2px;
//         }
//         .cr-micro::after {
//           content: ''; position: absolute; top: 12px; right: 8px;
//           width: 9px; height: 9px; border-radius: 50%;
//           background: rgba(244,127,31,0.2);
//         }

//         .cr-tv {
//           position: absolute; right: 3%; bottom: 20%;
//           width: 108px; height: 76px;
//           background: #1a1206; border: 2px solid #2a1e0a; border-radius: 4px;
//         }
//         .cr-tv::before {
//           content: ''; position: absolute;
//           top: 6px; left: 6px; right: 6px; bottom: 14px;
//           background: #0d0800; border: 1px solid rgba(244,127,31,0.08); border-radius: 2px;
//         }
//         .cr-tv::after {
//           content: ''; position: absolute; bottom: 4px;
//           left: 50%; transform: translateX(-50%);
//           width: 28px; height: 3px; background: #2a1e0a; border-radius: 2px;
//         }

//         .cr-ac {
//           position: absolute; top: 6%; right: 6%;
//           width: 130px; height: 34px;
//           background: #1a1206; border: 1px solid #2a1e0a; border-radius: 3px;
//         }
//         .cr-ac::before {
//           content: ''; position: absolute; bottom: 7px; left: 10px; right: 10px;
//           height: 2px; background: rgba(244,127,31,0.06); border-radius: 2px;
//         }

//         .cr-washer {
//           position: absolute; right: 2%; bottom: 20%;
//           margin-right: 120px;
//           width: 60px; height: 70px;
//           background: #1a1206; border: 1px solid #2a1e0a; border-radius: 4px;
//         }
//         .cr-washer::before {
//           content: ''; position: absolute;
//           top: 10px; left: 50%; transform: translateX(-50%);
//           width: 36px; height: 36px; border-radius: 50%;
//           border: 2px solid rgba(244,127,31,0.12);
//         }

//         .cr-counter {
//           position: absolute; bottom: 0; left: 0; right: 0; height: 20%;
//           background: #f5efe6; 
//           border-top: 1px solid rgba(244,127,31,0.1);
//           background-image:
//             linear-gradient(rgba(244,127,31,0.025) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(244,127,31,0.025) 1px, transparent 1px);
//           background-size: 28px 28px;
//         }

//         /* header */
//         .cr-header { text-align: center; margin-bottom: 40px; position: relative; z-index: 5; }
//         .cr-badge {
//           display: inline-block;
//           background: rgba(244,127,31,0.1); border: 1px solid rgba(244,127,31,0.22);
//           color: #F47F1F; background: rgba(244,127,31,0.08); font-size: 9px; letter-spacing: 3px;
//           padding: 4px 16px; border-radius: 20px; margin-bottom: 14px;
//           text-transform: uppercase;
//         }
//         .cr-title {
//           font-size: clamp(28px, 5vw, 44px); font-weight: 900;
//           color: #1a0800; letter-spacing: -1px;
//         }
//         .cr-title span { color: #F47F1F; }
//         .cr-title-sub { font-size: 12px; color: #888; margin-top: 8px; letter-spacing: 0.5px; }

//         /* cards */
//         .cr-cards {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 18px;
//           width: 100%;
//           max-width: 620px;
//           position: relative;
//           z-index: 5;
//         }
//         @media (max-width: 540px) { .cr-cards { grid-template-columns: 1fr; } }

//         .cr-card {
//           background: #fff;
//           border: 1px solid rgba(244,127,31,0.15);
//           border-radius: 16px;
//           padding: 28px 18px 22px;
//           text-align: center;
//           transition: transform 0.3s ease, border-color 0.3s;
//           cursor: pointer;
//         }
//         .cr-card:hover {
//           transform: translateY(-8px);
//           border-color: rgba(244,127,31,0.5);
//         }

//         .cr-icon-wrap {
//           width: 66px; height: 66px; border-radius: 50%;
//           display: flex; align-items: center; justify-content: center;
//           margin: 0 auto 16px; font-size: 30px;
//           transition: transform 0.3s;
//         }
//         .cr-card:hover .cr-icon-wrap { transform: scale(1.12) rotate(-5deg); }

//         .cr-card-title { font-size: 15px; font-weight: 700; color: #1a0800; margin-bottom: 8px; }
//         .cr-card-desc  { font-size: 11px; color: #888; line-height: 1.6; margin-bottom: 20px; min-height: 36px; }

//         .cr-btn {
//           display: flex; align-items: center; justify-content: center; gap: 6px;
//           width: 100%; padding: 11px 14px; border-radius: 8px;
//           font-family: 'Space Grotesk','Poppins',sans-serif;
//           font-size: 11px; font-weight: 700; letter-spacing: 1px;
//           text-transform: uppercase; border: none; cursor: pointer;
//           transition: opacity 0.2s, transform 0.15s;
//         }
//         .cr-btn:hover { opacity: 0.9; transform: scale(1.03); }
//         .cr-btn:active { transform: scale(0.98); }

//         .cr-btn-wa   { background: #25D366; color: #fff; }
//         .cr-btn-call { background: #F47F1F; color: #1a0800; box-shadow: 0 4px 16px rgba(244,127,31,0.35); }
//         .cr-btn-mail {
//           background: rgba(244,127,31,0.12); color: #F47F1F;
//           border: 1px solid rgba(244,127,31,0.3);
//         }
//         .cr-btn-mail:hover { background: rgba(244,127,31,0.22); }

//         /* bottom info strip */
//         .cr-strip {
//           display: flex; gap: 24px; margin-top: 32px;
//           position: relative; z-index: 5; flex-wrap: wrap;
//           justify-content: center;
//         }
//         .cr-strip-item {
//           display: flex; align-items: center; gap: 8px;
//           font-size: 11px; color: #aaa;
//         }
//         .cr-strip-dot {
//           width: 6px; height: 6px; border-radius: 50%;
//           background: rgba(244,127,31,0.4);
//           animation: stripPulse 2s ease-in-out infinite;
//         }
//         .cr-strip-item:nth-child(2) .cr-strip-dot { animation-delay: 0.6s; }
//         .cr-strip-item:nth-child(3) .cr-strip-dot { animation-delay: 1.2s; }
//         @keyframes stripPulse {
//           0%,100% { background: rgba(244,127,31,0.3); }
//           50%      { background: rgba(244,127,31,0.8); }
//         }
//       `}</style>

//       <div className="cr-root">
//         <div className="cr-bg" />
//         <div className="cr-counter" />
//         <div className="cr-fridge" />
//         <div className="cr-micro" />
//         <div className="cr-washer" />
//         <div className="cr-tv" />
//         <div className="cr-ac" />

//         <div className="cr-header">
//           <div className="cr-badge">✦ We're here for you ✦</div>
//           <h1 className="cr-title">Contact <span>Us</span></h1>
//           <p className="cr-title-sub">We're here to help and answer any questions you might have</p>
//         </div>

//         <div className="cr-cards">
//           {cards.map((card, i) => (
//             <div key={i} className="cr-card">
//               <div className="cr-icon-wrap" style={{ background: card.iconBg, border: `1px solid ${card.iconBorder}` }}>
//                 {card.icon}
//               </div>
//               <div className="cr-card-title">{card.title}</div>
//               <div className="cr-card-desc">{card.desc}</div>
//               <button className={`cr-btn ${card.btnClass}`} onClick={card.action}>
//                 {card.btnText}
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="cr-strip">
//           <div className="cr-strip-item">
//             <div className="cr-strip-dot" />
//             <span>📍 New Delhi, India</span>
//           </div>
//           <div className="cr-strip-item">
//             <div className="cr-strip-dot" />
//             <span>⏰ Mon–Sat · 9AM–7PM IST</span>
//           </div>
//           <div className="cr-strip-item">
//             <div className="cr-strip-dot" />
//             <span>⚡ Reply within 24 hours</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Contact;

import React from 'react';

const Contact = () => {
  const cards = [
    {
      icon: '💬',
      iconBg: 'rgba(37,211,102,0.12)',
      iconBorder: 'rgba(37,211,102,0.25)',
      title: 'WhatsApp Support',
      desc: 'Get instant support through WhatsApp anytime',
      btnClass: 'cr-btn-wa',
      btnText: '💬 Chat with Us',
      action: () => window.open('https://wa.me/918000121313', '_blank'),
    },
    {
      icon: '📞',
      iconBg: 'rgba(244,127,31,0.12)',
      iconBorder: 'rgba(244,127,31,0.25)',
      title: 'Call Us',
      desc: 'Available Monday to Saturday, 10am – 6pm IST',
      btnClass: 'cr-btn-call',
      btnText: '📞 +91 8000121313',
      action: () => window.open('tel:+918000121313'),
    },
    {
      icon: '✉️',
      iconBg: 'rgba(244,127,31,0.12)',
      iconBorder: 'rgba(244,127,31,0.25)',
      title: 'Email Us',
      desc: 'Send us your queries anytime, we reply within 24h',
      btnClass: 'cr-btn-mail',
      btnText: '✉️ Send Email',
      action: () => window.open('mailto:support@brightflix.in'),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;900&display=swap');

        .cr-root {
          font-family: 'Space Grotesk', 'Poppins', sans-serif;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: #0d0a00;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .cr-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 50% 80%, rgba(244,127,31,0.09) 0%, transparent 65%),
            radial-gradient(ellipse at 20% 20%, rgba(244,127,31,0.04) 0%, transparent 50%);
        }

        /* appliances */
        .cr-fridge {
          position: absolute; left: 2%; bottom: 20%;
          width: 62px; height: 170px;
          background: #1a1206; border: 1px solid #2a1e0a;
          border-radius: 4px 4px 2px 2px;
        }
        .cr-fridge::before {
          content: ''; position: absolute; top: 10px; right: 7px;
          width: 4px; height: 32px;
          background: rgba(244,127,31,0.18); border-radius: 3px;
        }
        .cr-fridge::after {
          content: ''; position: absolute; top: 48%;
          left: 0; right: 0; height: 1px; background: #2a1e0a;
        }

        .cr-micro {
          position: absolute; left: 10%; bottom: 42%;
          width: 68px; height: 44px;
          background: #1a1206; border: 1px solid #2a1e0a; border-radius: 3px;
        }
        .cr-micro::before {
          content: ''; position: absolute; top: 7px; left: 7px;
          width: 38px; height: 30px;
          background: #0d0800; border: 1px solid rgba(244,127,31,0.08); border-radius: 2px;
        }
        .cr-micro::after {
          content: ''; position: absolute; top: 12px; right: 8px;
          width: 9px; height: 9px; border-radius: 50%;
          background: rgba(244,127,31,0.2);
        }

        .cr-tv {
          position: absolute; right: 3%; bottom: 20%;
          width: 108px; height: 76px;
          background: #1a1206; border: 2px solid #2a1e0a; border-radius: 4px;
        }
        .cr-tv::before {
          content: ''; position: absolute;
          top: 6px; left: 6px; right: 6px; bottom: 14px;
          background: #0d0800; border: 1px solid rgba(244,127,31,0.08); border-radius: 2px;
        }
        .cr-tv::after {
          content: ''; position: absolute; bottom: 4px;
          left: 50%; transform: translateX(-50%);
          width: 28px; height: 3px; background: #2a1e0a; border-radius: 2px;
        }

        .cr-ac {
          position: absolute; top: 6%; right: 6%;
          width: 130px; height: 34px;
          background: #1a1206; border: 1px solid #2a1e0a; border-radius: 3px;
        }
        .cr-ac::before {
          content: ''; position: absolute; bottom: 7px; left: 10px; right: 10px;
          height: 2px; background: rgba(244,127,31,0.06); border-radius: 2px;
        }

        .cr-washer {
          position: absolute; right: 2%; bottom: 20%;
          margin-right: 120px;
          width: 60px; height: 70px;
          background: #1a1206; border: 1px solid #2a1e0a; border-radius: 4px;
        }
        .cr-washer::before {
          content: ''; position: absolute;
          top: 10px; left: 50%; transform: translateX(-50%);
          width: 36px; height: 36px; border-radius: 50%;
          border: 2px solid rgba(244,127,31,0.12);
        }

        .cr-counter {
          position: absolute; bottom: 0; left: 0; right: 0; height: 20%;
          background: #0f0c00;
          border-top: 1px solid rgba(244,127,31,0.07);
          background-image:
            linear-gradient(rgba(244,127,31,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244,127,31,0.025) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* header */
        .cr-header { text-align: center; margin-bottom: 40px; position: relative; z-index: 5; }
        .cr-badge {
          display: inline-block;
          background: rgba(244,127,31,0.1); border: 1px solid rgba(244,127,31,0.22);
          color: #F47F1F; font-size: 9px; letter-spacing: 3px;
          padding: 4px 16px; border-radius: 20px; margin-bottom: 14px;
          text-transform: uppercase;
        }
        .cr-title {
          font-size: clamp(28px, 5vw, 44px); font-weight: 900;
          color: #fff; letter-spacing: -1px;
        }
        .cr-title span { color: #F47F1F; }
        .cr-title-sub { font-size: 12px; color: #664422; margin-top: 8px; letter-spacing: 0.5px; }

        /* cards */
        .cr-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          width: 100%;
          max-width: 620px;
          position: relative;
          z-index: 5;
        }
        @media (max-width: 540px) { .cr-cards { grid-template-columns: 1fr; } }

        .cr-card {
          background: rgba(25,18,0,0.92);
          border: 1px solid rgba(244,127,31,0.18);
          border-radius: 16px;
          padding: 28px 18px 22px;
          text-align: center;
          transition: transform 0.3s ease, border-color 0.3s;
          cursor: pointer;
        }
        .cr-card:hover {
          transform: translateY(-8px);
          border-color: rgba(244,127,31,0.5);
        }

        .cr-icon-wrap {
          width: 66px; height: 66px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px; font-size: 30px;
          transition: transform 0.3s;
        }
        .cr-card:hover .cr-icon-wrap { transform: scale(1.12) rotate(-5deg); }

        .cr-card-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .cr-card-desc  { font-size: 11px; color: #664422; line-height: 1.6; margin-bottom: 20px; min-height: 36px; }

        .cr-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          width: 100%; padding: 11px 14px; border-radius: 8px;
          font-family: 'Space Grotesk','Poppins',sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; border: none; cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }
        .cr-btn:hover { opacity: 0.9; transform: scale(1.03); }
        .cr-btn:active { transform: scale(0.98); }

        .cr-btn-wa   { background: #25D366; color: #fff; }
        .cr-btn-call { background: #F47F1F; color: #1a0800; box-shadow: 0 4px 16px rgba(244,127,31,0.35); }
        .cr-btn-mail {
          background: rgba(244,127,31,0.12); color: #F47F1F;
          border: 1px solid rgba(244,127,31,0.3);
        }
        .cr-btn-mail:hover { background: rgba(244,127,31,0.22); }

        /* bottom info strip */
        .cr-strip {
          display: flex; gap: 24px; margin-top: 32px;
          position: relative; z-index: 5; flex-wrap: wrap;
          justify-content: center;
        }
        .cr-strip-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; color: #443322;
        }
        .cr-strip-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(244,127,31,0.4);
          animation: stripPulse 2s ease-in-out infinite;
        }
        .cr-strip-item:nth-child(2) .cr-strip-dot { animation-delay: 0.6s; }
        .cr-strip-item:nth-child(3) .cr-strip-dot { animation-delay: 1.2s; }
        @keyframes stripPulse {
          0%,100% { background: rgba(244,127,31,0.3); }
          50%      { background: rgba(244,127,31,0.8); }
        }
      `}</style>

      <div className="cr-root">
        <div className="cr-bg" />
        <div className="cr-counter" />
        <div className="cr-fridge" />
        <div className="cr-micro" />
        <div className="cr-washer" />
        <div className="cr-tv" />
        <div className="cr-ac" />

        <div className="cr-header">
          <div className="cr-badge">✦ We're here for you ✦</div>
          <h1 className="cr-title">Contact <span>Us</span></h1>
          <p className="cr-title-sub">We're here to help and answer any questions you might have</p>
        </div>

        <div className="cr-cards">
          {cards.map((card, i) => (
            <div key={i} className="cr-card">
              <div className="cr-icon-wrap" style={{ background: card.iconBg, border: `1px solid ${card.iconBorder}` }}>
                {card.icon}
              </div>
              <div className="cr-card-title">{card.title}</div>
              <div className="cr-card-desc">{card.desc}</div>
              <button className={`cr-btn ${card.btnClass}`} onClick={card.action}>
                {card.btnText}
              </button>
            </div>
          ))}
        </div>

        <div className="cr-strip">
          <div className="cr-strip-item">
            <div className="cr-strip-dot" />
            <span>📍 New Delhi, India</span>
          </div>
          <div className="cr-strip-item">
            <div className="cr-strip-dot" />
            <span>⏰ Mon–Sat · 9AM–7PM IST</span>
          </div>
          <div className="cr-strip-item">
            <div className="cr-strip-dot" />
            <span>⚡ Reply within 24 hours</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
