import { useDroppable } from "@dnd-kit/core";
import PropTypes from "prop-types";
import { useSnapshot } from "valtio";
import { gameBoardState } from "./Game";

const DroppableCell = ({ cellId }) => {
  const { setNodeRef } = useDroppable({ id: cellId });
  const snapBoardState = useSnapshot(gameBoardState)

  console.log(snapBoardState.hoveredCellId, 'test')

  return <div className={`cell ${snapBoardState.hoveredCellId === cellId ? 'hoveredCell' : ''}`} ref={setNodeRef}></div>;
};

DroppableCell.propTypes = {
  cellId: PropTypes.number,
};

export default DroppableCell;
