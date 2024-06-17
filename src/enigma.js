import React, { useState, useEffect } from "react";
import useEnigma from "./hooks/useEnigma";

const cleanWord = (dummyWord, rotor) => {
  let tempWord = "";
  for (let i = 0; i < dummyWord.length; i++) {
    if (rotor.includes(dummyWord[i])) {
      tempWord += dummyWord[i];
    } else if (dummyWord[i] === " ") {
      tempWord += "_";
    }
  }
  return tempWord;
};

const configure = (rotorChoices, rotors) => {
  const config = {};
  for (let i = 0; i < rotorChoices.length; i++) {
    config["rotor" + (i + 1).toString()] = rotors[rotorChoices[i]];
  }
  return config;
};

const selectPlug = (plugBoard, plug) => {
  const newPlug = { ...plug };
  let idx = 0;
  for (let i = 0; i < plugBoard.length / 2; i++) {
    const letterSwap1 = plugBoard[idx];
    const letterSwap2 = plugBoard[idx + 1];
    newPlug[letterSwap1] = letterSwap2;
    newPlug[letterSwap2] = letterSwap1;
    idx += 2;
  }

  return newPlug;
};

const encode = (word, rotorConfig, plug) => {
  const { rotor1, rotor2, rotor3 } = rotorConfig;
  const reflector = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ_1234567890",
    "0987654321_ZYXWVUTSRQPONMLKJIHGFEDCBA",
  ];

  let newWord = "";
  let [r1, r2] = [0, 0];
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];

    letter = plug[letter];

    const lengthOfR = rotor1[1].length;

    const firstIdx = rotor1[1].indexOf(letter);
    const secondLetter = rotor2[0][firstIdx];
    const secondIdx = rotor2[1].indexOf(secondLetter);
    const thirdLetter = rotor3[0][secondIdx];
    const thirdIdx = rotor3[1].indexOf(thirdLetter);

    const reflectorLetter = reflector[1][thirdIdx];
    const reflectorIdx = reflector[0].indexOf(reflectorLetter);

    const thirdLetterReturn = rotor3[1][reflectorIdx];
    const thirdIdxReturn = rotor3[0].indexOf(thirdLetterReturn);
    const secondLetterReturn = rotor2[1][thirdIdxReturn];
    const secondIdxReturn = rotor2[0].indexOf(secondLetterReturn);
    const output = rotor1[1][secondIdxReturn];
    const finalOutput = plug[output];

    newWord += finalOutput;

    rotor1[1] = rotate(1, rotor1);

    r1++;
    if (r1 >= lengthOfR) {
      rotor2[1] = rotate(1, rotor2);
      r2++;
      r1 = 0;
    }
    if (r2 >= lengthOfR) {
      rotor3[1] = rotate(1, rotor3);
      r2 = 0;
    }
  }
  return newWord;
};

const rotate = (num, rotor) => {
  const length = rotor[1].length;
  const effectiveRotations = num % length;
  const rotatedString =
    rotor[1].slice(effectiveRotations) + rotor[1].slice(0, effectiveRotations);
  return rotatedString;
};

const Enigma = (props) => {
  const dummyWord = props.word.toUpperCase();
  const { rotors, setRotors, plug, setPlug } = useEnigma();
  const plug1 = selectPlug(props.plugBoard, plug);
  const [rotorConfig, setRotorConfig] = useState(
    configure(props.rotorChoices, rotors)
  );

  const [word, setWord] = useState(
    encode(cleanWord(dummyWord, rotors[0][0]), rotorConfig, plug1)
  );

  return (
    <>
      <div>{word}</div>
    </>
  );
};

export default Enigma;
