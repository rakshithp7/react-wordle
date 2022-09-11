import { useEffect, useState } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import Header from "./components/Header";
import Game from "./components/Game";

function App() {
  const [keyboardData, setKeyboardData] = useState<KeyboardTypes>({
    pressedKey: "",
    coloredKeys: [],
  });

  const updateGameKey = (val: string) => {
    setKeyboardData({ pressedKey: val });
  };

  const setColoredKeys = (val: string[]) => {
    setKeyboardData({ coloredKeys: [...val] });
  };

  return (
    <div className="App">
      <Header />
      <Game keyboardData={keyboardData} setColoredKeys={setColoredKeys} />
      <Keyboard keyboardEvent={updateGameKey} keyboardData={keyboardData} />
    </div>
  );
}

export default App;
