// src/components/PlugBoard.js
import React, { useState } from 'react';

const PlugBoard = ({ onConnectionsChange }) => {
  const [connections, setConnections] = useState({});

  const handleConnection = (e) => {
    const [from, to] = e.target.value.toUpperCase().split('');
    if (from && to) {
      setConnections(prev => {
        const newConnections = { ...prev, [from]: to, [to]: from };
        onConnectionsChange(newConnections);
        return newConnections;
      });
    }
  };

  return (
    <div className="plugboard">
      <h3>Plugboard</h3>
      <input
        type="text"
        placeholder="Enter pairs (e.g., AB CD)"
        onChange={handleConnection}
      />
      <div className="connections">
        {Object.entries(connections).map(([from, to]) => (
          <span key={from}>{from}-{to} </span>
        ))}
      </div>
    </div>
  );
};

export default PlugBoard;