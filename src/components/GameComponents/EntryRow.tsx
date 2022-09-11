import React, { FC, useEffect, useState } from "react";
import "./EntryRow.css";
import EntryKey from "./EntryKey";
import { colorCodes as _colorCodes } from "../../colorCodes";

interface Props {
  inputWord?: string | string[];
  colors: string;
}

const EntryRow: FC<Props> = ({ inputWord, colors }) => {
  const [colorCodes, _] = useState<string[]>(_colorCodes);
  const [keyColors, setKeyColors] = useState<string[]>([]);

  useEffect(() => {
    setKeyColors(
      colors.split("").map((val) => {
        return colorCodes[parseInt(val)];
      })
    );
  }, [colors]);

  return (
    <div className="entryRow__container">
      <EntryKey
        selectedLetter={inputWord ? inputWord[0] : ""}
        color={keyColors[0]}
      />
      <EntryKey
        selectedLetter={inputWord ? inputWord[1] : ""}
        color={keyColors[1]}
      />
      <EntryKey
        selectedLetter={inputWord ? inputWord[2] : ""}
        color={keyColors[2]}
      />
      <EntryKey
        selectedLetter={inputWord ? inputWord[3] : ""}
        color={keyColors[3]}
      />
      <EntryKey
        selectedLetter={inputWord ? inputWord[4] : ""}
        color={keyColors[4]}
      />
    </div>
  );
};

export default EntryRow;
