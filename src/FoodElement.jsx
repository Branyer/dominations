import PropTypes from "prop-types";
import "./App.css";
import { getElementInfo } from "./data/elements";
import { useSnapshot } from "valtio";
import { gameBoardState } from "./state/gameBoardState";
import { useEffect, useState } from "react";
import useIntervalHook from "use-interval-hook";
import { Tooltip } from "react-tooltip";

function FoodElement({ data }) {
  const snapBoardState = useSnapshot(gameBoardState);
  const [seconds, setSeconds] = useState(0);

  const { currentAge } = snapBoardState;

  const { image, name, harvest } = getElementInfo(data.foodElementId);
  const { activeCitizens, id } = data;
  const { time, citizens, food } = harvest[currentAge];

  const { activate, pause, isPaused } = useIntervalHook({
    interval: 1000,
    callback: () => {
      if (seconds * 1000 === time) {
        const per = (100 * activeCitizens) / citizens;

        gameBoardState.addFood(food / (100 / per));
        setSeconds(0);
      } else {
        setSeconds((s) => s + 1);
      }
    },
    deactivedAtFirst: true,
  });

  const [i, j] = data.position.split("-");

  const top = i * 42;
  const left = j * 50;

  useEffect(() => {
    if (activeCitizens === 0) {
      pause();
    } else {
      if (isPaused) {
        setSeconds(0);
        activate();
      }
    }
  }, [activeCitizens]);

  return (
    <>
      <div
        title={name}
        style={{
          top,
          left,
          width: 50,
          height: 42,
        }}
        className={"foodElement" + " food-" + data.id}
      >
        {citizens > activeCitizens ? (
          <button
            title="add citizen"
            className="add-citizen"
            onClick={() => gameBoardState.addCitizen(id)}
          >
            <span>+</span>
          </button>
        ) : null}
        {activeCitizens > 0 ? (
          <button
            title="remove citizen"
            className="remove-citizen"
            onClick={() => gameBoardState.removeCitizen(id)}
          >
            <span>-</span>
          </button>
        ) : null}
        <div title="active citizens" className="count-citizen">
          {activeCitizens}
        </div>
        {!isPaused ? (
          <div title="seconds to get food" className="count-work">
            {seconds}
          </div>
        ) : null}

        <img src={image[currentAge]} alt={name} draggable="false" />
      </div>
      <Tooltip anchorSelect={".food-" + data.id} clickable>
        <div>
          <span>{name}</span>

          <p>Generates: {food} Food</p>
          <p>Time: {time / 1000}s </p>
          <p>Max. Citizens: {citizens} </p>
        </div>
      </Tooltip>
    </>
  );
}

FoodElement.propTypes = {
  data: PropTypes.any,
};

export default FoodElement;
