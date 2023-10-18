import Game from "./Game";
// import StartScreen from "./StartScreen";
import PropTypes from "prop-types";
import "./App.css";

function BuildingGeneral({ data }) {
  // const snap = useSnapshot(globalState);

  const [i, j] = data.position.split("-");

  const top = i * 42;
  const left = j * 50;

  return (
    <>
      <div
        style={{
          top,
          left,
          width: data.square === 1 ? 50 : 50 * 2,
          height: data.square === 1 ? 42 : 42 * 2,
        }}
        className="building"
      >
        <img src={data.image} alt={data.name} draggable="false" />
      </div>
    </>
  );
}

BuildingGeneral.propTypes = {
  data: PropTypes.any,
};

export default BuildingGeneral;
