import { proxy } from "valtio";
import { v4 as uuidv4 } from "uuid";

const createBoard = () =>
  Array(200)
    .fill({ taken: false })
    .map((c, idx) => {
      const i = Math.floor(idx / 20);
      const j = idx - i * 20;

      return {
        ...c,
        id: `${i}-${j}`,
      };
    });

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const createBush = () => {
  const auxBoard = createBoard();

  const bushPositions = auxBoard
    .filter((c) => {
      const [i, j] = c.id.split("-");

      if (
        i == 0 ||
        j == 0 ||
        i == 9 ||
        j == 19 ||
        (i == 1 && j == 1) ||
        (i == 1 && j == 18) ||
        (i == 8 && j == 1) ||
        (i == 8 && j == 18)
      )
        return true;

      return false;
    })
    .map((c) => c.id);

  return bushPositions;
};

export const gameBoardState = proxy({
  hoveredCellId: undefined,
  buildingId: undefined,
  currentAge: "dawn",
  resources: {
    gold: 0,
    food: 0,
    citizens: 3,
    activeCitizens: 0,
  },
  cellsFieldState: createBoard(),
  elementsAdded: [],
  bush: [],
  upgradeBuilding: (buildingId, upgradeToId) => {
    if (upgradeToId) {
      gameBoardState.elementsAdded = gameBoardState.elementsAdded.map((ea) => {
        if (ea.id === buildingId) {
          return {
            ...ea,
            buldingId: upgradeToId,
          };
        }

        return { ...ea };
      });
    } else {
      if (gameBoardState.currentAge === "dawn") {
        gameBoardState.currentAge = "stone";
      } else if (gameBoardState.currentAge === "stone") {
        gameBoardState.currentAge = "bronze";
      }
    }
  },
  addFood: (foodQuantity) => {
    gameBoardState.resources.food =
      gameBoardState.resources.food + foodQuantity;
  },
  addGold: (goldQuantity) => {
    gameBoardState.resources.gold =
      gameBoardState.resources.gold + goldQuantity;
  },
  addCitizen: (addedElementId) => {
    if (
      gameBoardState.resources.citizens -
        gameBoardState.resources.activeCitizens >
      0
    ) {
      gameBoardState.elementsAdded = gameBoardState.elementsAdded.map((ea) => {
        if (ea.id === addedElementId) {
          const activeCitizens = ea.activeCitizens + 1;

          return {
            ...ea,
            activeCitizens,
          };
        }

        return { ...ea };
      });

      gameBoardState.resources.activeCitizens =
        gameBoardState.resources.activeCitizens + 1;
    }
  },
  setConstructionFinished: (addedElementId) => {
    gameBoardState.elementsAdded = gameBoardState.elementsAdded.map((ea) => {
      if (ea.id === addedElementId) {
        return {
          ...ea,
          constructionFinished: true,
        };
      }

      return { ...ea };
    });

    gameBoardState.resources.activeCitizens =
      gameBoardState.resources.activeCitizens - 1;
  },
  removeCitizen: (addedElementId) => {
    gameBoardState.elementsAdded = gameBoardState.elementsAdded.map((ea) => {
      if (ea.id === addedElementId) {
        const activeCitizens = ea.activeCitizens - 1;

        return {
          ...ea,
          activeCitizens,
        };
      }

      return { ...ea };
    });

    gameBoardState.resources.activeCitizens =
      gameBoardState.resources.activeCitizens - 1;
  },

  initGame: () => {
    gameBoardState.addBush();
    gameBoardState.addPileOfSticks();
    gameBoardState.addFruitTrees(3);
    gameBoardState.addGoldMine(1);
  },

  addPileOfSticks: () => {
    for (let idx = 0; idx < 2; idx++) {
      let flag = false;

      while (!flag) {
        const i = getRandomInt(0, 9);
        const j = getRandomInt(0, 19);

        const cell = gameBoardState.cellsFieldState.find(
          (c) => c.id === `${i}-${j}`
        );

        if (!cell.taken) {
          gameBoardState.addBuilding([cell.id], 2, true);
          flag = true;
        }
      }
    }
  },
  addFruitTrees: (quantity) => {
    for (let idx = 0; idx < quantity; idx++) {
      let flag = false;

      while (!flag) {
        const i = getRandomInt(0, 9);
        const j = getRandomInt(0, 19);

        const cell = gameBoardState.cellsFieldState.find(
          (c) => c.id === `${i}-${j}`
        );

        if (!cell.taken) {
          gameBoardState.addFoodElement([cell.id], 7);
          flag = true;
        }
      }
    }
  },
  addGoldMine: (quantity) => {
    for (let idx = 0; idx < quantity; idx++) {
      let flag = false;

      while (!flag) {
        const i = getRandomInt(0, 9);
        const j = getRandomInt(0, 19);

        const cell = gameBoardState.cellsFieldState.find(
          (c) => c.id === `${i}-${j}`
        );

        if (!cell.taken) {
          gameBoardState.addGoldElement([cell.id], 8);
          flag = true;
        }
      }
    }
  },

  addBush: () => {
    const bushInfo = createBush();

    if (bushInfo) {
      gameBoardState.cellsFieldState = gameBoardState.cellsFieldState.map(
        (c) => {
          if (bushInfo.includes(c.id)) {
            return {
              ...c,
              taken: true,
            };
          }

          return {
            ...c,
          };
        }
      );

      gameBoardState.bush = bushInfo.map((b) => {
        return {
          id: uuidv4(),
          position: b,
          elementId: 13,
        };
      });
    }

    return gameBoardState.cellsFieldState;
  },
  addFoodElement: (cellsTaken, foodElementId) => {
    if (cellsTaken) {
      gameBoardState.cellsFieldState = gameBoardState.cellsFieldState.map(
        (c) => {
          if (cellsTaken.includes(c.id)) {
            return {
              ...c,
              taken: true,
            };
          }

          return {
            ...c,
          };
        }
      );

      gameBoardState.elementsAdded = [
        ...gameBoardState.elementsAdded,
        {
          id: uuidv4(),
          position: cellsTaken[0],
          activeCitizens: 0,
          foodElementId,
        },
      ];
    }
  },
  addGoldElement: (cellsTaken, goldElementId) => {
    if (cellsTaken) {
      gameBoardState.cellsFieldState = gameBoardState.cellsFieldState.map(
        (c) => {
          if (cellsTaken.includes(c.id)) {
            return {
              ...c,
              taken: true,
            };
          }

          return {
            ...c,
          };
        }
      );

      gameBoardState.elementsAdded = [
        ...gameBoardState.elementsAdded,
        {
          id: uuidv4(),
          position: cellsTaken[0],
          activeCitizens: 0,
          goldElementId,
        },
      ];
    }
  },
  addBuilding: (cellsTaken, buldingId, constructionFinished) => {
    if (cellsTaken) {
      gameBoardState.cellsFieldState = gameBoardState.cellsFieldState.map(
        (c) => {
          if (cellsTaken.includes(c.id)) {
            return {
              ...c,
              taken: true,
            };
          }

          return {
            ...c,
          };
        }
      );

      gameBoardState.elementsAdded = [
        ...gameBoardState.elementsAdded,
        {
          id: uuidv4(),
          position: cellsTaken[0],
          activeCitizens: 0,
          constructionFinished: constructionFinished || false,
          buldingId,
        },
      ];
    }
  },
});
