import React, { FC } from "react";
import "./Key.css";

interface Props {
  letter: string;
  onClickFn: (e: string) => void;
  styles?: React.CSSProperties;
}

const Key: FC<Props> = ({ letter, onClickFn, styles }) => {
  return (
    <div
      className="key__container"
      style={styles}
      onClick={() => onClickFn(letter)}
    >
      <p>{letter}</p>
    </div>
  );
};

export default Key;
