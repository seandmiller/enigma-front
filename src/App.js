import React, { useState, useCallback } from "react";
import Info from "./instructions";
import Technical from "./technical";
import {
  faCamera,
  faLock,
  faKey,
  faCircle,
  faCogs,
  faAtom,
  faCode,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import Camera from "./camera";
import DigitalEnigma from "./enigma";
import useRotors from "./hooks/useRotors";
import usePlugBoard from "./hooks/usePlugBoard";

library.add(
  faLock,
  faCamera,
  faKey,
  faCircle,
  faCogs,
  faAtom,
  faCode,
  faEnvelope
);

const RotorButton = ({ icon, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={`Select ${icon} rotor`}
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);

const PlugBoardButton = ({ letter, onClick }) => (
  <button
    onClick={onClick}
    className="plug"
    aria-label={`Select ${letter} for plugboard`}
  >
    {letter}
  </button>
);

const App = () => {
  const [word, setWord] = useState("");
  const [encryption, setEncryption] = useState(false);
  const [scrambled, setScrambled] = useState("");
  const [instructions, setInstructions] = useState(true);
  const [camera, setCamera] = useState(false);
  const { rotorSettings, rotorsKey, rotors, handleRotor } = useRotors();
  const { plugBoard, letters, enablePlug, handlePlugBoard, setEnablePlug } =
    usePlugBoard();
  const setInputRef = useCallback((node) => {
    if (node) {
      node.focus();
    }
  }, []);

  const encryptMsg = (word) => {
    setEncryption(true);
    setScrambled(word);
    setWord("");
  };

  const handleChange = (e) => {
    setWord(e.target.value.replace(" ", "_"));
    setEncryption(false);
  };

  if (camera) {
    return (
      <Camera
        handleCamera={() => setCamera(!camera)}
        encrypt={encryptMsg}
        plugBoard={plugBoard}
        rotors={rotors}
        encryptedWord={encryption}
      />
    );
  }

  if (instructions) {
    return (
      <div className="info-wrapper">
        <Info />
        <button onClick={() => setInstructions(false)}>I'm ready</button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="page-wrapper">
        <div className="top-part">
          <div className="nested">
            <h1>The Enigma Machine</h1>
            <p>Inspired by the Movie: The Imitation Game</p>

            <input
              type="text"
              name="word"
              value={word}
              onChange={handleChange}
              aria-label="Input word"
            />

            <h1 className="encrypt-wrapper" ref={setInputRef}>
              {encryption ? (
                <div className="encrypt">
                  <DigitalEnigma
                    word={scrambled}
                    rotorChoices={rotors}
                    plugBoard={plugBoard}
                  />
                </div>
              ) : (
                <FontAwesomeIcon icon="lock" />
              )}
            </h1>

            {rotors.length === 3 &&
              (plugBoard.length === 20 || !enablePlug) && (
                <div className="scramble-action-wrapper">
                  <button className="scramble" onClick={() => encryptMsg(word)}>
                    Scramble
                  </button>
                  <div className="cam-btn-wrapper">
                    <div
                      className="camera-btn"
                      onClick={() => setCamera(!camera)}
                      aria-label="Open Camera"
                    >
                      <FontAwesomeIcon icon="camera" />
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        <div className="bottom">
          <h2 className="h2-class">Choose your rotors</h2>
          <div className="rotors">
            {rotors.length < 3 && (
              <div className="choices">
                <RotorButton
                  icon="key"
                  onClick={() => handleRotor("key", 0)}
                  disabled={!rotorSettings[0]}
                />
                <RotorButton
                  icon="atom"
                  onClick={() => handleRotor("atom", 1)}
                  disabled={!rotorSettings[1]}
                />
                <RotorButton
                  icon="cogs"
                  onClick={() => handleRotor("cogs", 2)}
                  disabled={!rotorSettings[2]}
                />
                <RotorButton
                  icon="code"
                  onClick={() => handleRotor("code", 3)}
                  disabled={!rotorSettings[3]}
                />
                <RotorButton
                  icon="envelope"
                  onClick={() => handleRotor("envelope", 4)}
                  disabled={!rotorSettings[4]}
                />
              </div>
            )}
            <div className="chosen-container">
              <div className="chosen-wrapper">
                {rotorsKey.map((item, index) => (
                  <div className="chosen" key={index}>
                    <FontAwesomeIcon icon={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="plugBoard-wrapper">
          <h2>Plug Board</h2>
          <div className="plug-settings">{plugBoard.join(" ")}</div>

          {plugBoard.length < 20 && (
            <div>
              {enablePlug ? (
                <div className="plug-board">
                  {letters.map((letter) => (
                    <PlugBoardButton
                      key={letter}
                      letter={letter}
                      onClick={() => handlePlugBoard(letter)}
                    />
                  ))}
                </div>
              ) : (
                <div className="enablePlug">
                  <button
                    onClick={() => {
                      alert("20 letters must be selected!");
                      setEnablePlug(true);
                    }}
                  >
                    Enable Plug Board
                  </button>
                  <p>
                    Select 20 letters for this feature, these 20 letters will
                    need to be included as apart of your key
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <Technical />
      </div>
    </div>
  );
};

export default App;
