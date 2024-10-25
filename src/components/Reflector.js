// src/components/Reflector.js
import React from 'react';

const Reflector = ({ type, onTypeChange }) => {
  const reflectorTypes = ['B', 'C'];

  return (
    <div className="reflector">
      <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
        {reflectorTypes.map(t => <option key={t} value={t}>Reflector {t}</option>)}
      </select>
    </div>
  );
};

export default Reflector;