// src/components/EnigmaMachine.js
import React, { useState, useEffect } from 'react';
import Rotor from './Rotor';
import Reflector from './Reflector';
import Lampboard from './Lampboard';
import Keyboard from './Keyboard';
import PlugBoard from './PlugBoard';
import { encrypt } from '../utils/enigmaLogic';
import '../styles/EnigmaMachine.css';

const EnigmaMachine = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [rotorPositions, setRotorPositions] = useState([0, 0, 0]);
  const [rotorTypes, setRotorTypes] = useState(['I', 'II', 'III']);
  const [reflectorType, setReflectorType] = useState('B');
  const [lightedLamp, setLightedLamp] = useState(null);
  const [plugboardConnections, setPlugboardConnections] = useState({});
  const [mode, setMode] = useState('Encode');

  useEffect(() => {
    if (output) {
      setLightedLamp(output[output.length - 1]);
    }
  }, [output]);

  const handleKeyPress = (char) => {
    const newInput = input + char;
    setInput(newInput);
    const encryptedChar = encrypt(char, rotorPositions, rotorTypes, reflectorType, plugboardConnections);
    setOutput(output + encryptedChar);
    setRotorPositions(prevPositions => {
      const newPositions = [...prevPositions];
      newPositions[0] = (newPositions[0] + 1) % 26;
      if (newPositions[0] === 0) {
        newPositions[1] = (newPositions[1] + 1) % 26;
        if (newPositions[1] === 0) {
          newPositions[2] = (newPositions[2] + 1) % 26;
        }
      }
      return newPositions;
    });
  };

  const handleRotorChange = (index, type) => {
    setRotorTypes(prev => {
      const newTypes = [...prev];
      newTypes[index] = type;
      return newTypes;
    });
  };

  const handleReflectorChange = (type) => {
    setReflectorType(type);
  };

  const handlePlugboardChange = (connections) => {
    setPlugboardConnections(connections);
  };

  const handleModeChange = () => {
    setMode(prevMode => prevMode === 'Encode' ? 'Decode' : 'Encode');
    setInput(output);
    setOutput('');
    setRotorPositions([0, 0, 0]);
  };

  return (
    <div className="enigma-machine">
      <h1>Enigma Machine</h1>
      <div className="mode-indicator">
        Current Mode: <span className="mode">{mode}</span>
      </div>
      <div className="rotor-container">
        {rotorTypes.map((type, index) => (
          <Rotor
            key={index}
            position={rotorPositions[index]}
            type={type}
            onTypeChange={(newType) => handleRotorChange(index, newType)}
          />
        ))}
      </div>
      <Reflector type={reflectorType} onTypeChange={handleReflectorChange} />
      <Lampboard lightedLamp={lightedLamp} />
      <Keyboard onKeyPress={handleKeyPress} />
      <PlugBoard onConnectionsChange={handlePlugboardChange} />
      <div className="io-container">
        <div>
          <label>Input:</label>
          <input type="text" value={input} readOnly />
        </div>
        <div>
          <label>Output:</label>
          <input type="text" value={output} readOnly />
        </div>
      </div>
      <button className="mode-button" onClick={handleModeChange}>
        Switch to {mode === 'Encode' ? 'Decode' : 'Encode'}
      </button>
    </div>
  );
};

export default EnigmaMachine;