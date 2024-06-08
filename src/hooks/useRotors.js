import { useState } from 'react';

const useRotors = () => {
  const [rotorSettings, setRotorSettings] = useState([true, true, true, true, true]);
  const [rotorsKey, setRotorsKey] = useState([]);
  const [rotors, setRotors] = useState([]);

  const handleRotor = (key, rotor) => {
    setRotorSettings(prevSettings => {
      const settings = [...prevSettings];
      settings[rotor] = false;
      return settings;
    });
    setRotorsKey(prevKeys => [...prevKeys, key]);
    setRotors(prevRotors => [...prevRotors, rotor]);
  };

  return {
    rotorSettings,
    rotorsKey,
    rotors,
    handleRotor
  };
};

export default useRotors;
