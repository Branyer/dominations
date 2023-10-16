import { globalState } from "./App";

function StartScreen() {
  return (
    <>
      <div className="startscreen-container">
        <h1>Dominations (Simulacion de Sistemas)</h1>

        <button onClick={() => globalState.playing = true}>Empieza el Juego!</button>
      </div>
    </>
  );
}

export default StartScreen;
