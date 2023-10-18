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
import BuildingGeneral from "./BuildingGeneral";

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
        conditions: {
          gold: 100,
          food: 100,
          wood: 100,
        },
        image: "images/dawn-age-town-center.png",
        square: 4,
        quantity: 1,
      },
      {
        id: 2,
        name: "Pile of Sticks",
        conditions: [],
        image: "images/pile-of-sticks.png",
        square: 1,
        quantity: 2,
      },
      {
        id: 3,
        name: "House",
        conditions: [],
        image: "images/dawn-age-house.png",
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
    Array(200)
      .fill({ taken: false })
      .map((c, idx) => {
        const i = Math.floor(idx / 20);
        const j = idx - i * 20;
        return {
          ...c,
          id: `${i}-${j}`,
        };
      })
  );

  const [buildingsAdded, setBuildingsAdded] = useState([]);

  const validatePosition = (square) => {
    if (square === 1) {
      const fieldCell = playerField.find(
        (f) => f.id === snapBoardState.hoveredCellId
      );

      if (!fieldCell?.taken && fieldCell) return [snapBoardState.hoveredCellId];
    } else if (square === 4) {
      const [hoveredI, hoveredJ] = snapBoardState.hoveredCellId.split("-");

      const fieldCell = playerField.find(
        (f) => f.id === snapBoardState.hoveredCellId
      );

      const fieldCellRigth = playerField.find((f) => {
        const [fieldI, fieldJ] = f.id.split("-");

        if (Number(hoveredJ) + 1 <= 19) {
          if (hoveredI == fieldI && Number(hoveredJ) + 1 == fieldJ) return true;
        }

        return false;
      });

      const fieldBottom = playerField.find((f) => {
        const [fieldI, fieldJ] = f.id.split("-");

        if (Number(hoveredI) + 1 <= 9) {
          if (Number(hoveredI) + 1 == fieldI && hoveredJ == fieldJ) return true;
        }

        return false;
      });

      const fieldBottomRigth = playerField.find((f) => {
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
    if (
      snapBoardState.hoveredCellId === undefined ||
      !snapBoardState.buildingId
    )
      return;

    const buildingInfo = ages["dawn"].buildings.find(
      (b) => b.id === snapBoardState.buildingId
    );

    const square = buildingInfo?.square;

    const cellsTaken = validatePosition(square);

    if (cellsTaken) {
      setPlayerField((p) => {
        return p.map((c) => {
          if (cellsTaken.includes(c.id)) {
            return {
              ...c,
              taken: true,
            };
          }

          return {
            ...c,
          };
        });
      });

      //todo add building

      setBuildingsAdded((bs) => {
        return [
          ...bs,
          {
            position: cellsTaken[0],
            ...buildingInfo,
          },
        ];
      });
    }

    // if (Number(hoveredJ) + 1 <= 19) {

    console.log(snapBoardState.hoveredCellId, snapBoardState.buildingId);

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
          <div className="info-container">
            <div className="info">
              <img
                src="public/images/gold-coin.png"
                alt="gold"
                className="img-info"
              />
              <span className="info-details">0</span>
            </div>
            <div className="info">
              <img
                src="public/images/food.png"
                alt="food"
                className="img-info"
              />
              <span className="info-details">0</span>
            </div>
            <div className="info">
              <img
                src="public/images/citizens.png"
                alt="citizens"
                className="img-info"
              />
              <span className="info-details">0/4</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 5, paddingBottom: 10 }}>
            {ages["dawn"].buildings.map((test) => {
              return (
                <DraggableBuilding
                  key={test.id}
                  id={test.id}
                  building={test}
                  buildings={ages["dawn"].buildings}
                />
              );
            })}
          </div>
          <div className="game-board-grid">
            {playerField.map((data) => {
              return (
                <DroppableCell
                  key={data.id}
                  cellId={data.id}
                  taken={data.taken}
                  buildings={ages["dawn"].buildings}
                />
              );
            })}

            {buildingsAdded.map((data) => {
              return <BuildingGeneral data={data} />;
            })}

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
