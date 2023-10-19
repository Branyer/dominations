import { useDroppable } from "@dnd-kit/core";
import PropTypes from "prop-types";
import { useSnapshot } from "valtio";
import { gameBoardState } from "./state/gameBoardState";


const DroppableCell = ({ cellId, buildings, taken }) => {
  const { setNodeRef } = useDroppable({ id: cellId });
  const snapBoardState = useSnapshot(gameBoardState);

  const getStatus = () => {
    if (
      snapBoardState.hoveredCellId === undefined ||
      !snapBoardState.buildingId
    )
      return "";

    const buildingInfo = buildings.find(
      (b) => b.id === snapBoardState.buildingId
    );

    const square = buildingInfo?.square;

    const [hoveredI, hoveredJ] = snapBoardState.hoveredCellId.split("-");
    const [cellI, cellJ] = cellId.split("-");

    if (square === 1) {
      return snapBoardState.hoveredCellId === cellId ? "hovered-cell" : "";
    } else if (square === 4) {
      if (snapBoardState.hoveredCellId === cellId) {
        return "hovered-cell";
      } else {
        //derecha

        if (Number(hoveredJ) + 1 <= 19) {
          if (hoveredI == cellI && Number(hoveredJ) + 1 == cellJ)
            return "hovered-cell";
        }

        //abajo

        if (Number(hoveredI) + 1 <= 9) {
          if (Number(hoveredI) + 1 == cellI && hoveredJ == cellJ)
            return "hovered-cell";
        }

        //derecha abajo


        if (Number(hoveredI) + 1 <= 9 && Number(hoveredJ) + 1 <= 19) {
          if (Number(hoveredI) + 1 == cellI && Number(hoveredJ) + 1 == cellJ)
            return "hovered-cell";
        }

      }
    } else {
      return "";
    }
  };

  const status = getStatus();

  return <div id={cellId} className={`cell ${status} ${taken ? 'taken-cell' : ''}`} ref={setNodeRef}></div>;
};

DroppableCell.propTypes = {
  cellId: PropTypes.string,
  buildings: PropTypes.any,
  taken: PropTypes.bool
};

export default DroppableCell;
