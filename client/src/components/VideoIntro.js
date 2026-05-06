import React, { useRef, useEffect, useState } from 'react';
import './VideoIntro.css';

/*
  VIDEO FILE SIZES TO PREPARE:
  ─────────────────────────────────────────────────────────────
  📁 Place these files inside:  client/public/

  FILE NAME                     RESOLUTION        FOR
  ─────────────────────────────────────────────────────────────
  intro-video-desktop.mp4       1920 × 1080 px    PC / Laptop
  intro-video-tablet.mp4        1024 × 768  px    iPad / Tablet
  intro-video-mobile.mp4         540 × 960  px    Mobile (portrait 9:16)
  ─────────────────────────────────────────────────────────────

  HOW TO CREATE MOBILE VERSION (portrait crop):
  - Use any video editor (CapCut, Adobe Premiere, DaVinci Resolve)
  - Export at 540×960 (9:16 portrait) or 720×1280
  - If you only have one video, you can still use it — the CSS
    `object-fit: cover` will auto-crop it to fill the screen.
*/

// Detect device type by screen width
const getDeviceType = () => {
  const width = window.innerWidth;
  if (width <= 480) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
};

// Return the correct video src based on device
const getVideoSrc = (device) => {
  switch (device) {
    case 'mobile':  return '/intro-video-mobile.mp4';
    case 'tablet':  return '/intro-video-tablet.mp4';
    default:        return '/intro-video-desktop.mp4';
  }
};

const VideoIntro = ({ onEnd }) => {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [device] = useState(getDeviceType);   // locked at mount time
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const triggerEndOnce = (() => {
      let called = false;
      return () => {
        if (called) return;
        called = true;
        setFadeOut(true);
        setTimeout(onEnd, 700);
      };
    })();

    // Store ref so skip button can call it too
    triggerEndRef.current = triggerEndOnce;

    video.play().catch(() => {
      // Autoplay blocked (common on mobile without user gesture)
      // Show fallback animation and auto-advance after 3s
      setVideoError(true);
      setTimeout(triggerEndOnce, 3000);
    });

    video.addEventListener('ended', triggerEndOnce);

    // Hard safety cap — never hang longer than 12s
    const fallback = setTimeout(triggerEndOnce, 12000);

    return () => {
      video.removeEventListener('ended', triggerEndOnce);
      clearTimeout(fallback);
    };
  }, [onEnd]);

  // Shared ref so skip btn can call the same triggerEnd
  const triggerEndRef = useRef(null);
  const handleSkip = () => triggerEndRef.current?.();

  const handleVideoError = () => {
    // File not found or format unsupported — fall back to animation
    setVideoError(true);
  };

  return (
    <div className={`video-intro device-${device} ${fadeOut ? 'fade-out' : ''}`}>

      {/* VIDEO — different file per device */}
      {!videoError && (
        <video
          ref={videoRef}
          className="intro-video"
          key={device}               /* re-mounts if device changes */
          muted
          playsInline
          preload="auto"
          onError={handleVideoError}
        >
          {/* Browser picks the first <source> it can play */}
          <source src={getVideoSrc(device)} type="video/mp4" />

          {/* Fallback: if device-specific file missing, try generic */}
          <source src="/intro-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* FALLBACK ANIMATION — shown if video fails / autoplay blocked */}
      <div className={`intro-fallback ${videoError ? 'visible' : ''}`}>
        <div className="intro-logo-anim">
          <div className="globe-ring">
            <div className="globe" />
            <div className="ring" />
          </div>
          <div className="intro-brand-text">
            <span className="brand-bright">BRIGHT</span>
            <span className="brand-flix">FLIX</span>
          </div>
          <p className="intro-tagline">Smart Living Starts Here</p>
        </div>
      </div>

      {/* DEVICE BADGE — helpful during development, remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="dev-badge">📱 {device}</div>
      )}

      <button className="skip-btn" onClick={handleSkip}>
        Skip ›
      </button>
    </div>
  );
};

export default VideoIntro;