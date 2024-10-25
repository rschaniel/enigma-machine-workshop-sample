// src/components/Lampboard.js
import React from 'react';

const Lampboard = ({ lightedLamp }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="lampboard">
      {alphabet.map((letter) => (
        <div
          key={letter}
          className={`lamp ${lightedLamp === letter ? 'lit' : ''}`}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default Lampboard;