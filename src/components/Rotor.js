// src/components/Rotor.js
import React from 'react';

const Rotor = ({ position, type, onTypeChange }) => {
  const rotorTypes = ['I', 'II', 'III', 'IV', 'V'];

  return (
    <div className="rotor">
      <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
        {rotorTypes.map(t => <option key={t} value={t}>Rotor {t}</option>)}
      </select>
      <div className="rotor-position">{String.fromCharCode(65 + position)}</div>
    </div>
  );
};

export default Rotor;