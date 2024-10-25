// src/utils/enigmaLogic.js
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const rotors = {
  I: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
  II: 'AJDKSIRUXBLHWTMCQGZNPYFVOE',
  III: 'BDFHJLCPRTXVZNYEIWGAKMUSQO',
  IV: 'ESOVPZJAYQUIRHXLNFTGKDCMWB',
  V: 'VZBRGITYUPSDNHLXAWMJQOFECK'
};

const reflectors = {
  B: 'YRUHQSLDPXNGOKMIEBFZCWVJAT',
  C: 'FVPJIAOYEDRZXWGCTKUQSBNMHL'
};

const rotateChar = (char, offset) => {
  const index = ALPHABET.indexOf(char);
  return ALPHABET[(index + offset + 26) % 26];
};

const applyRotor = (char, rotor, position, reverse = false) => {
  const rotated = rotateChar(char, position);
  const mapped = reverse
    ? ALPHABET[rotor.indexOf(rotated)]
    : rotor[ALPHABET.indexOf(rotated)];
  return rotateChar(mapped, -position);
};

export const encrypt = (char, positions, rotorTypes, reflectorType, plugboard) => {
  if (!ALPHABET.includes(char)) return char;

  // Apply plugboard
  char = plugboard[char] || char;

  // Apply rotors
  for (let i = rotorTypes.length - 1; i >= 0; i--) {
    char = applyRotor(char, rotors[rotorTypes[i]], positions[i]);
  }

  // Apply reflector
  char = reflectors[reflectorType][ALPHABET.indexOf(char)];

  // Apply rotors in reverse
  for (let i = 0; i < rotorTypes.length; i++) {
    char = applyRotor(char, rotors[rotorTypes[i]], positions[i], true);
  }

  // Apply plugboard again
  char = plugboard[char] || char;

  return char;
};