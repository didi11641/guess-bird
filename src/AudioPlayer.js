import React from 'react';
import { useEffect, useRef } from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [src]);

  return (
    <div className="audio-player">
      <audio controls autoPlay loop={true} preload="auto" crossOrigin="anonymous" key={src}>
        <source src={src} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;