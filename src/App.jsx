import Game from "./Game";
// import StartScreen from "./StartScreen";
import "./App.css";
import { proxy, useSnapshot } from "valtio";

export const globalState = proxy({ playing: false });

function App() {
  // const snap = useSnapshot(globalState);

  return (
    <>
      <div className="global-container">
        <div className="game-container">
           <Game /> 
        </div>
      </div>
    </>
  );
}

export default App;
