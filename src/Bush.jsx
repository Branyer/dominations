import PropTypes from "prop-types";
import "./App.css";
import { getElementInfo } from "./data/elements";

function Bush({ data }) {
  const { image, name } = getElementInfo(data.elementId);

  const [i, j] = data.position.split("-");

  const top = i * 42;
  const left = j * 50;

  return (
    <>
      <div
        style={{
          top,
          left,
          width: 50,
          height: 42,
        }}
        className="bush"
      >
        <img src={image} alt={name} draggable="false" />
      </div>
    </>
  );
}

Bush.propTypes = {
  data: PropTypes.any,
};

export default Bush;
