import { useState } from 'react';

const usePlugBoard = () => {
  const [letters, setLetters] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '_']);
  const [plugBoard, setPlugBoard] = useState([]);
  const [enablePlug, setEnablePlug] = useState(false);

  const handlePlugBoard = (letter) => {
    setPlugBoard(prevBoard => [...prevBoard, letter]);
    setLetters(prevLetters => prevLetters.filter(item => item !== letter));
  };

  return {
    plugBoard,
    letters,
    enablePlug,
    handlePlugBoard,
    setEnablePlug
  };
};

export default usePlugBoard;
