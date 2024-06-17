import { useState } from "react";

const useEnigma = () => {
  const plugb = {};

  const rotorOne = [
    "USROTZIBHQDNA_WLGCYXEPJVFKM1234567890",
    "THSMEBANOVXGPKYQW09DC1I2J3F4Z5L6R7U8_",
  ];
  const rotorTwo = [
    "CB1A2DE3U4Q56R78_SLH0Z9JYMKFGINOPTVWX",
    "D1A2EBZIMNYOKTWPVXC_LJF0H9RS876UQ5G43",
  ];
  const rotorThree = [
    "DECBAFIJMNHKLU_1234567890RPGOQYWXZSTV",
    "ABDECONJPQL0987654321MKIHGTUZF_VWXRSY",
  ];

  const rotorFour = [
    "_KELQ12IYPV34WFR56ATX78BN90HZGOCMSDJU",
    "IFGJ54VP321LDHQ678_O90CSKRNUTZBMAYWEX",
  ];
  const rotorFive = [
    "UC12NQRF36745OZW89SH0ADVEXLBPIJ_TKMGY",
    "RTNHPZBFWOLDCGQVJK0Y7M129A86E5X34IUS_",
  ];
  for (var i = 0; i < rotorFive[0].length; i++) {
    const key = rotorFive[0][i];
    plugb[key] = key;
  }

  const [rotors, setRotors] = useState([
    rotorOne,
    rotorTwo,
    rotorThree,
    rotorFour,
    rotorFive,
  ]);

  const [plug, setPlug] = useState(plugb);

  return {
    rotors,
    setRotors,
    plug,
    setPlug,
  };
};

export default useEnigma;
