import React, { FC, useEffect, useState } from "react";
import "./EntryKey.css";

interface Props {
  selectedLetter: string;
  color: string;
}

const EntryKey: FC<Props> = ({ selectedLetter, color }) => {
  const [letter, setLetter] = useState("");

  useEffect(() => {
    setLetter(selectedLetter);
  }, [selectedLetter]);

  return (
    <div className="entryKey__container" style={{ backgroundColor: color }}>
      <input
        disabled
        className="entryKey__inputField"
        defaultValue={letter}
        maxLength={1}
      />
    </div>
  );
};

export default EntryKey;
