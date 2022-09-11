import React, { FC, useEffect, useRef, useState } from "react";
import "./Game.css";
import wordList from "../assets/words.txt";
import guessWordList from "../assets/5letterwords.txt";
import EntryRow from "./GameComponents/EntryRow";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  keyboardData: KeyboardTypes;
  setColoredKeys: (e: string[]) => void;
}

const Game: FC<Props> = ({ keyboardData, setColoredKeys }) => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [attempt, setAttempt] = useState(0);
  const [legitWords, setLegitWords] = useState<string[]>([]);
  const [guessWord, setGuessWord] = useState<string>("");
  const [colors, setColors] = useState<string[]>([
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
  ]);

  useEffect(() => {
    fetch(wordList)
      .then((response) => response.text())
      .then((res) => {
        setLegitWords(res.split("\n"));
      });

    pickGuessWord();
  }, []);

  const pickGuessWord = () => {
    fetch(guessWordList)
      .then((response) => response.text())
      .then((res) => {
        let words = res.split("\n");
        let selectedWord =
          words[Math.floor(Math.random() * words.length)].trim();
        setGuessWord(selectedWord);
        console.log("Word to guess : ", selectedWord);
      });
  };

  const resetGame = () => {
    setSelectedLetters([]);
    setUsedWords([]);
    setAttempt(0);
    pickGuessWord();
    setColors(["00000", "00000", "00000", "00000", "00000", "00000"]);
    setColoredKeys([]);
  };

  const colorLetters = () => {
    let temp = colors;
    for (let i = 0; i < 5; i++) {
      if (selectedLetters[i].toLowerCase() == guessWord[i]) {
        // color the key green (1)
        temp[attempt] =
          temp[attempt].substring(0, i) + "1" + temp[attempt].substring(i + 1);
      } else if (guessWord.indexOf(selectedLetters[i].toLowerCase()) !== -1) {
        // color the key yellow (2)
        temp[attempt] =
          temp[attempt].substring(0, i) + "2" + temp[attempt].substring(i + 1);
      } else {
        // color the key grey (3);
        temp[attempt] =
          temp[attempt].substring(0, i) + "3" + temp[attempt].substring(i + 1);
      }
    }
    setColors([...temp]);
  };

  useEffect(() => {
    if (keyboardData.pressedKey) {
      if (keyboardData.pressedKey == "Backspace") {
        setSelectedLetters(selectedLetters.slice(0, -1));
      } else if (keyboardData.pressedKey == "Enter") {
        if (selectedLetters.length == 5) {
          // check if word
          if (
            !legitWords.find((val) => {
              return val == selectedLetters.join("").toLowerCase();
            })
          ) {
            toast("not a word.");
            setSelectedLetters([]);
            return;
          }

          if (usedWords.includes(selectedLetters.join(""))) {
            toast("Word already tried.");
            setSelectedLetters([]);
            return;
          }

          // check if correct guess
          if (selectedLetters.join("").toLowerCase() == guessWord) {
            toast.success("correct guess!");
            // clear the game
            resetGame();
          } else {
            toast.error("incorrect guess");
            colorLetters();
            let temp = usedWords;
            usedWords[attempt] = selectedLetters.join("");
            setUsedWords(temp);
            setSelectedLetters([]);
            setAttempt(attempt + 1);

            // update keyboard colors
            setColoredKeys(
              selectedLetters.map((val, i) => {
                return val + colors[attempt][i];
              })
            );
          }
        } else {
          toast.warning("Please make a 5 letter word.");
        }
      } else if (selectedLetters.length == 5) {
        console.log("Already selected 5 letters.");
      } else {
        setSelectedLetters([...selectedLetters, keyboardData.pressedKey]);
      }
    }
  }, [keyboardData]);

  useEffect(() => {
    // check if attempts exhausted
    if (attempt === 6) {
      // attempts over
      toast(`All your attempts are empty. The word was :  ${guessWord}`);
      resetGame();
    }
  }, [attempt]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, _] = useState("");

  const openKeyboard = () => {
    // open keyboard for mobile
    inputRef.current?.focus();
  };

  const inputOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedLetters([
      ...selectedLetters,
      e.currentTarget.value.toUpperCase(),
    ]);
  };

  return (
    <div className="game__container" onClick={openKeyboard}>
      <ToastContainer position="top-right" autoClose={3000} />
      <EntryRow
        inputWord={attempt == 0 ? selectedLetters : usedWords[0]}
        colors={colors[0]}
      />
      <EntryRow
        inputWord={attempt == 1 ? selectedLetters : usedWords[1]}
        colors={colors[1]}
      />
      <EntryRow
        inputWord={attempt == 2 ? selectedLetters : usedWords[2]}
        colors={colors[2]}
      />
      <EntryRow
        inputWord={attempt == 3 ? selectedLetters : usedWords[3]}
        colors={colors[3]}
      />
      <EntryRow
        inputWord={attempt == 4 ? selectedLetters : usedWords[4]}
        colors={colors[4]}
      />
      <EntryRow
        inputWord={attempt == 5 ? selectedLetters : usedWords[5]}
        colors={colors[5]}
      />
      <input
        type="text"
        ref={inputRef}
        value={inputVal}
        onChange={inputOnChange}
        style={{
          opacity: 0,
          width: 0,
          height: 0,
        }}
      />
    </div>
  );
};

export default Game;
