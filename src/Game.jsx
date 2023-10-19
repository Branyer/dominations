import { useEffect, useRef } from "react";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useSnapshot } from "valtio";
import DroppableCell from "./DroppableCell";

import DraggableBuilding from "./DraggableBuilding";
import BuildingGeneral from "./BuildingGeneral";
import Bush from "./Bush";
import { gameBoardState } from "./state/gameBoardState";
import { elements } from "./data/elements";
import FoodElement from "./FoodElement";
import GoldElement from "./GoldElement";

// const ages = {
//   dawn: {
//     title: "DAWN AGE",
//   },
//   stone: {
//     title: "STONE AGE",
//   },
//   bronze: {
//     title: "BRONZE AGE",
//   },
// };

function Game() {
  const snapBoardState = useSnapshot(gameBoardState);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const refFirstTime = useRef(true);

  const {
    cellsFieldState,
    hoveredCellId,
    buildingId,
    currentAge,
    elementsAdded,
    resources,
  } = snapBoardState;

  const buildings = elements.filter((el) => {
    const quantityAdded = elementsAdded.filter(
      (ea) => ea.buldingId == el.id
    ).length;

    if (
      (el.name === "House" || el.name === "Pile of Sticks") &&
      currentAge === "dawn"
    )
      return false;

    return (
      ["building", "building-food", "building-gold", "decoration"].includes(
        el.type
      ) &&
      el.ages.includes(currentAge) &&
      quantityAdded < el.quantity[currentAge]
    );
  });

  const validatePosition = (square) => {
    if (square === 1) {
      const fieldCell = cellsFieldState.find((f) => f.id === hoveredCellId);

      if (!fieldCell?.taken && fieldCell) return [hoveredCellId];
    } else if (square === 4) {
      const [hoveredI, hoveredJ] = snapBoardState.hoveredCellId.split("-");

      const fieldCell = cellsFieldState.find(
        (f) => f.id === snapBoardState.hoveredCellId
      );

      const fieldCellRigth = cellsFieldState.find((f) => {
        const [fieldI, fieldJ] = f.id.split("-");

        if (Number(hoveredJ) + 1 <= 19) {
          if (hoveredI == fieldI && Number(hoveredJ) + 1 == fieldJ) return true;
        }

        return false;
      });

      const fieldBottom = cellsFieldState.find((f) => {
        const [fieldI, fieldJ] = f.id.split("-");

        if (Number(hoveredI) + 1 <= 9) {
          if (Number(hoveredI) + 1 == fieldI && hoveredJ == fieldJ) return true;
        }

        return false;
      });

      const fieldBottomRigth = cellsFieldState.find((f) => {
        const [fieldI, fieldJ] = f.id.split("-");

        if (Number(hoveredI) + 1 <= 9 && Number(hoveredJ) + 1 <= 19) {
          if (Number(hoveredI) + 1 == fieldI && Number(hoveredJ) + 1 == fieldJ)
            return true;
        }

        return false;
      });

      if (
        fieldCell &&
        fieldCellRigth &&
        fieldBottom &&
        fieldBottomRigth &&
        !fieldCell?.taken &&
        !fieldCellRigth?.taken &&
        !fieldBottom?.taken &&
        !fieldBottomRigth?.taken
      ) {
        return [
          fieldCell.id,
          fieldCellRigth.id,
          fieldBottom.id,
          fieldBottomRigth.id,
        ];
      }
    }
  };

  const handleDragEnd = () => {
    if (hoveredCellId === undefined || !buildingId) return;

    const buildingInfo = buildings.find((b) => b.id === buildingId);

    const square = buildingInfo?.square;

    const cellsTaken = validatePosition(square);

    if (cellsTaken) {
      gameBoardState.addBuilding(cellsTaken, buildingId);
    }

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

  useEffect(() => {
    //INIT GAME

    if (refFirstTime.current) {
      gameBoardState.initGame();

      refFirstTime.current = false;
    }
  }, [cellsFieldState]);

  useEffect(() => {
    const houses = elementsAdded.filter((ea) => ea.buldingId === 3);

    gameBoardState.resources.citizens = houses.length * 2 + 3;
  }, [elementsAdded]);

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
          <div>Current Age: {snapBoardState.currentAge}</div>
          <div className="info-container">
            <div className="info">
              <img
                src="public/images/gold-coin.png"
                alt="gold"
                className="img-info"
              />
              <span className="info-details">{resources.gold}</span>
            </div>
            <div className="info">
              <img
                src="public/images/food.png"
                alt="food"
                className="img-info"
              />
              <span className="info-details">{resources.food}</span>
            </div>
            <div className="info">
              <img
                src="public/images/citizens.png"
                alt="citizens"
                className="img-info"
              />
              <span className="info-details">
                {resources.citizens - resources.activeCitizens}/
                {resources.citizens}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 5, paddingBottom: 10 }}>
            {buildings.map((b) => {
              return <DraggableBuilding key={b.id} id={b.id} building={b} />;
            })}
          </div>
          <div className="game-board-grid">
            {cellsFieldState.map((data) => {
              return (
                <DroppableCell
                  key={data.id}
                  cellId={data.id}
                  taken={data.taken}
                  buildings={buildings}
                />
              );
            })}

            {elementsAdded.map((data) => {
              if (data.foodElementId) {
                return <FoodElement key={data.id} data={data} />;
              }

              if (data.goldElementId) {
                return <GoldElement key={data.id} data={data} />;
              }

              if (data.buldingId) {
                return <BuildingGeneral key={data.id} data={data} />;
              }

              return null;
            })}
            {snapBoardState.bush.map((data) => {
              return <Bush key={data.id} data={data} />;
            })}
          </div>
        </div>
      </DndContext>
    </>
  );
}

export default Game;
