import React, { useRef, useEffect, useState } from 'react';
import './VideoIntro.css';

const VideoIntro = ({ onEnd }) => {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Auto play
    video.play().catch(() => {
      // If autoplay blocked, end intro after 1s
      setTimeout(triggerEnd, 1000);
    });

    const handleEnd = () => triggerEnd();
    video.addEventListener('ended', handleEnd);

    // Safety fallback: end after 10s max
    const fallback = setTimeout(triggerEnd, 10000);

    return () => {
      video.removeEventListener('ended', handleEnd);
      clearTimeout(fallback);
    };
  }, []);

  const triggerEnd = () => {
    setFadeOut(true);
    setTimeout(onEnd, 700);
  };

  const handleSkip = () => triggerEnd();

  return (
    <div className={`video-intro ${fadeOut ? 'fade-out' : ''}`}>
      <video
        ref={videoRef}
        className="intro-video"
        src="/intro-video.mp4"
        muted
        playsInline
        preload="auto"
      />
      {/* Fallback for when video can't load 
      <div className="intro-fallback">
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
      <button className="skip-btn" onClick={handleSkip}>
        Skip ›
      </button>*/}
    </div>
  );
};

export default VideoIntro;
