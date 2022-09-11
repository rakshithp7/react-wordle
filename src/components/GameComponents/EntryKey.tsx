import React, { FC, useEffect } from "react";
import "./EntryKey.css";

interface Props {
  selectedLetter: string;
  color: string;
}

const EntryKey: FC<Props> = ({ selectedLetter, color }) => {
  return (
    <div className="entryKey__container" style={{ backgroundColor: color }}>
      {selectedLetter}
    </div>
  );
};

export default EntryKey;
