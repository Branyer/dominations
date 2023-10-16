import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { proxy, useSnapshot } from "valtio";
import DroppableCell from "./DroppableCell";
import { useState } from "react";
import DraggableBuilding from "./DraggableBuilding";

export const gameBoardState = proxy({
  hoveredCellId: undefined,
  buildingId: undefined,
});

const ages = {
  dawn: {
    title: "DAWN AGE",
    buildings: [
      {
        id: 1,
        name: "Town Center",
        conditions: [],
        image: "",
        square: 4,
      },
      {
        id: 2,
        name: "Pile of Sticks",
        conditions: [],
        image: "",
        square: 1,
      },
      {
        id: 3,
        name: "House",
        conditions: [],
        image: "",
        square: 1,
      },
    ],
  },
  stone: {
    title: "STONE AGE",
    buildings: [
      {
        id: 4,
        name: "Market",
        conditions: [],
        image: "",
        square: 4,
      },
      {
        id: 5,
        name: "Mill",
        conditions: [],
        image: "",
        square: 1,
      },
    ],
  },
  bronze: {
    title: "BRONZE AGE",
    buildings: [
      {
        id: 6,
        name: "Farm",
        conditions: [],
        image: "",
        square: 4,
      },
      {
        id: 1,
        name: "Town Center",
        conditions: [],
        image: "",
        square: 4,
      },
    ],
  },
};

function Game() {
  const snapBoardState = useSnapshot(gameBoardState);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [playerField, setPlayerField] = useState(
    Array(200).fill({ taken: false })
  );

  const handleDragEnd = () => {
    if (
      snapBoardState.hoveredCellId === undefined ||
      !snapBoardState.buildingId
    )
      return;




      console.log(snapBoardState.hoveredCellId, snapBoardState.buildingId)

    // const shipLength = playerShips[draggedShipId].length;

    // if (isPositionValid(playerField, hoveredCellId, shipLength, axis)) {
    //   //get dropped ships positions
    //   const positions = createShipPositions(hoveredCellId, shipLength, axis);

    //   // set dropped ships new positions
    //   setPlayerShips((ships) => ({
    //     ...ships,
    //     [draggedShipId]: {
    //       ...ships[draggedShipId],
    //       positions,
    //       axis,
    //     },
    //   }));

    //   // set ids in cells
    //   const fieldClone = JSON.parse(JSON.stringify(playerField));

    //   positions.forEach(
    //     (id) =>
    //       (fieldClone[id] = {
    //         ...fieldClone[id],
    //         shipId: draggedShipId,
    //       })
    //   );

    //   setPlayerField(fieldClone);
    // }

    resetDnDState();
  };

  const handleDragOver = (event) => {
    gameBoardState.hoveredCellId = event.collisions?.at(0)?.id;
    gameBoardState.buildingId = event.active.id;
  };

  const resetDnDState = () => {
    gameBoardState.hoveredCellId = undefined;
    gameBoardState.buildingId = undefined;
  };

  return (
    <>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragCancel={resetDnDState}
        modifiers={[restrictToWindowEdges]}
        sensors={sensors}
      >
        <div>
          <div>
            {ages.dawn.buildings.map((test) => {
              return (
                <DraggableBuilding key={test.id} id={test.id} building={test} />
              );
            })}
          </div>
          <div className="game-board-grid">
            {playerField.map((data, id) => (
              <DroppableCell key={id} cellId={id} />
            ))}
            {/* {Object.entries(playerShips).map(([id, ship]) => (
            <FieldShip
              key={id}
              ship={ship}
              removeButtonHovered={Number(id) === shipBeingRemovedId}
              belongsTo="player"
            />
          ))} */}
          </div>
        </div>
      </DndContext>
    </>
  );
}

export default Game;
