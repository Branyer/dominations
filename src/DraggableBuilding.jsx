import { useDraggable } from "@dnd-kit/core";
import PropTypes from "prop-types";
import { useSnapshot } from "valtio";
import { gameBoardState } from "./state/gameBoardState";
import { Tooltip } from "react-tooltip";

const DraggableBuilding = ({ id, building }) => {
  const snapBoardState = useSnapshot(gameBoardState);
  const { currentAge } = snapBoardState;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const conditions = building.construction[currentAge]?.conditions;

  console.log(conditions, snapBoardState.resources);

  const conditionsAreValid =
    conditions?.gold <= snapBoardState.resources.gold &&
    conditions?.food <= snapBoardState.resources.food &&
    conditions?.citizens <=
      snapBoardState.resources.citizens -
        snapBoardState.resources.activeCitizens;

  const style = transform
    ? {
        transform: `translate3d(${transform.x + 40}px, ${
          transform.y + 40
        }px, 0)`,
        touchAction: "none",
      }
    : undefined;

  return (
    <>
      {conditionsAreValid ? (
        <>
          <div
            className={"dragable-building" + " building-" + id}
            style={style}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
          >
            <img
              src={`/${building.image[currentAge]}`}
              alt={building.name}
              draggable="false"
            />
            <p>{building.name}</p>
          </div>
          <Tooltip anchorSelect={".building-" + id} clickable>
            <div>
              <span>{building.name}</span>
              <p>Gold: {conditions?.gold}</p>
              <p>Food: {conditions?.food}</p>
              <p>Citizens: {conditions?.citizens}</p>
            </div>
          </Tooltip>
        </>
      ) : (
        <>
          <div
            className={"dragable-building blocked-building" + " building-" + id}
            style={style}
          >
            <img
              src={`/${building.image[currentAge]}`}
              alt={building.name}
              draggable="false"
            />
            <p>{building.name}</p>
          </div>
          <Tooltip anchorSelect={".building-" + id} clickable>
            <div>
              <span>{building.name}</span>
              <p>Gold: {conditions?.gold}</p>
              <p>Food: {conditions?.food}</p>
              <p>Citizens: {conditions?.citizens}</p>
            </div>
          </Tooltip>
        </>
      )}
    </>
  );
};

DraggableBuilding.propTypes = {
  id: PropTypes.number,
  building: PropTypes.any,
};

export default DraggableBuilding;
