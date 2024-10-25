// src/components/Keyboard.js
import React from 'react';

const Keyboard = ({ onKeyPress }) => {
  const rows = [
    'QWERTZUIO'.split(''),
    'ASDFGHJK'.split(''),
    'PYXCVBNML'.split(''),
  ];

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button key={key} onClick={() => onKeyPress(key)}>
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;