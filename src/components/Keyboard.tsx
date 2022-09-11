import React, { FC, useEffect, useState } from "react";
import Key from "./Key";
import "./Keyboard.css";
import keyboardKey from "keyboard-key";
import { colorCodes as _colorCodes } from "../colorCodes";

interface Props {
  keyboardEvent: (e: string) => void;
  keyboardData: KeyboardTypes;
}

interface alphabet {
  first: string[];
  second: string[];
  third: string[];
}

const Keyboard: FC<Props> = ({
  keyboardEvent,
  keyboardData: { coloredKeys },
}) => {
  const [alphabet, _] = useState<alphabet>({
    first: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    second: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    third: ["Z", "X", "C", "V", "B", "N", "M"],
  });
  const [keyColors, setKeyColors] = useState<string[]>([]);

  useEffect(() => {
    if (coloredKeys && coloredKeys.length == 0) {
      // reset/set key colors
      setKeyColors([...new Array(26).fill("0")]);
      return;
    }
    // check function
    coloredKeys?.map((val) => {
      let [letter, color] = val;
      let index = letter.charCodeAt(0) - 65;
      let temp = keyColors;
      if (keyColors[index] !== "0") {
        // update existing color
        if (keyColors[index] > color) {
          temp[index] = color;
          setKeyColors([...temp]);
        }
      } else {
        // first time
        temp[index] = color;
        setKeyColors([...temp]);
      }
    });
  }, [coloredKeys]);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      const code = keyboardKey.getCode(event);
      const key = keyboardKey.getKey(event);

      if (key && code && code >= 65 && code <= 90) {
        // letters
        keyboardEvent(key.toUpperCase());
      } else if (key && code && (code == 8 || code == 13)) {
        // controls
        keyboardEvent(key);
      }
    });
  }, []);

  return (
    <div className="keyboard__container">
      <div className="firstRow">
        {alphabet["first"].map((val, i) => (
          <Key
            letter={val}
            key={i}
            onClickFn={(val) => keyboardEvent(val)}
            styles={{
              backgroundColor:
                _colorCodes[parseInt(keyColors[val.charCodeAt(0) - 65])],
            }}
          />
        ))}
      </div>
      <div className="secondRow">
        {alphabet["second"].map((val, i) => {
          return (
            <Key
              letter={val}
              key={i}
              onClickFn={(val) => keyboardEvent(val)}
              styles={{
                backgroundColor:
                  _colorCodes[parseInt(keyColors[val.charCodeAt(0) - 65])],
              }}
            />
          );
        })}
      </div>
      <div className="thirdRow">
        <Key
          letter="Enter"
          onClickFn={(val) => keyboardEvent(val)}
          styles={{ width: "160px" }}
        />
        {alphabet["third"].map((val, i) => (
          <Key
            letter={val}
            key={i}
            onClickFn={(val) => keyboardEvent(val)}
            styles={{
              backgroundColor:
                _colorCodes[parseInt(keyColors[val.charCodeAt(0) - 65])],
            }}
          />
        ))}
        <Key
          letter="Backspace"
          onClickFn={(val) => keyboardEvent(val)}
          styles={{ width: "160px" }}
        />
      </div>
    </div>
  );
};

export default Keyboard;
