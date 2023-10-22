export const elements = [
  {
    id: 1,
    name: "Town Center",
    type: "building",
    ages: ["dawn", "stone", "bronze"],

    image: {
      dawn: "images/dawn-town-center.png",
      stone: "images/stone-town-center.png",
      bronze: "images/bronze-town-center.jpg",
    },
    square: 4,
    quantity: {
      dawn: 1,
      stone: 1,
      bronze: 1,
    },
    construction: {
      dawn: {
        time: 5000,
        citizens: 4,
        conditions: {
          gold: 100,
          food: 100,
          citizens: 4,
        },
      },
    },
    upgrade: {
      dawn: {
        time: 5000,
        citizens: 4,
        conditions: {
          gold: 300,
          food: 300,
          citizens: 4,
        },
      },
      stone: {
        time: 10000,
        citizens: 5,
        conditions: {
          gold: 700,
          food: 700,
          citizens: 5,
        },
      },
    },
  },
  {
    id: 2,
    name: "Pile of Sticks",
    type: "building",
    ages: ["dawn"],
    conditions: [],
    image: {
      dawn: "images/pile-of-sticks.png",
      stone: "",
      bronze: "",
    },
    square: 1,
    quantity: {
      dawn: 2,
      stone: 0,
      bronze: 0,
    },
    upgrade: {
      dawn: {
        time: 5000,
        conditions: {
          food: 50,
          gold: 0,
          citizens: 2,
        },
        upgradeTo: 3,
      },
    },
  },
  {
    id: 3,
    name: "House",
    type: "building",
    ages: ["dawn", "stone", "bronze"],

    image: {
      dawn: "images/dawn-house.png",
      stone: "images/stone-house.jpg",
      bronze: "images/bronze-house.jpg",
    },
    square: 1,
    quantity: {
      dawn: 2,
      stone: 5,
      bronze: 7,
    },
    construction: {
      stone: {
        time: 1000 * 7,

        conditions: {
          gold: 50,
          food: 50,
          citizens: 1,
        },
      },
      bronze: {
        time: 1000 * 10,

        conditions: {
          gold: 70,
          food: 70,
          citizens: 1,
        },
      },
    },
  },
  {
    id: 4,
    name: "Market",
    type: "building-gold",
    ages: ["stone", "bronze"],

    image: {
      dawn: "",
      stone: "images/stone-market.jpg",
      bronze: "images/bronze-market.jpg",
    },
    square: 4,
    quantity: {
      dawn: 0,
      stone: 1,
      bronze: 2,
    },
    construction: {
      stone: {
        time: 1000 * 20,
        conditions: {
          gold: 300,
          food: 500,
          citizens: 4,
        },
      },
      bronze: {
        time: 1000 * 30,
        conditions: {
          gold: 400,
          food: 1000,
          citizens: 4,
        },
      },
    },
    harvest: {
      stone: {
        time: 1000 * 20,
        citizens: 2,
        gold: 100,
      },
      bronze: {
        time: 1000 * 30,
        citizens: 2,
        gold: 200,
      },
    },
  },

  {
    id: 6,
    name: "Farm",
    type: "building-food",
    ages: ["bronze"],

    construction: {
      bronze: {
        time: 1000 * 15,
        conditions: {
          gold: 150,
          food: 150,
          citizens: 2,
        },
      },
    },
    image: {
      dawn: "",
      stone: "",
      bronze: "images/bronze-farm.jpg",
    },
    square: 4,
    quantity: {
      dawn: 0,
      stone: 0,
      bronze: 2,
    },
    harvest: {
      bronze: {
        time: 60000,
        citizens: 2,
        food: 75,
      },
    },
  },
  {
    id: 7,
    name: "Fruit tree",
    type: "food",
    ages: ["dawn", "stone", "bronze"],

    image: {
      dawn: "images/fruit-tree.jpg",
      stone: "images/fruit-tree.jpg",
      bronze: "images/fruit-tree.jpg",
    },
    square: 1,
    quantity: {
      dawn: 3,
      stone: 4,
      bronze: 4,
    },
    harvest: {
      dawn: {
        time: 1000 * 10,
        citizens: 2,
        food: 50,
      },
      stone: {
        time: 1000 * 20,
        citizens: 2,
        food: 100,
      },
      bronze: {
        time: 1000 * 30,
        citizens: 2,
        food: 150,
      },
    },
  },
  {
    id: 8,
    name: "Gold mine",
    type: "gold",
    ages: ["dawn", "stone", "bronze"],

    image: {
      dawn: "images/gold-mine.jpg",
      stone: "images/gold-mine.jpg",
      bronze: "images/gold-mine.jpg",
    },
    square: 1,
    quantity: {
      dawn: 1,
      stone: 2,
      bronze: 2,
    },
    harvest: {
      dawn: {
        time: 1000 * 10,
        citizens: 2,
        gold: 40,
      },
      stone: {
        time: 1000 * 20,
        citizens: 2,
        gold: 100,
      },
      bronze: {
        time: 1000 * 25,
        citizens: 2,
        gold: 150,
      },
    },
  },
  {
    id: 9,
    name: "Acropolis",
    type: "decoration",
    ages: ["bronze"],

    image: {
      dawn: "",
      stone: "",
      bronze: "images/bronze-acropolis.jpg",
    },
    construction: {
      bronze: {
        time: 1000 * 40,
        conditions: {
          gold: 1000,
          food: 500,
          citizens: 4,
        },
      },
    },
    square: 4,
    quantity: {
      bronze: 1,
    },
  },
  {
    id: 10,
    name: "Hanging Gardens",
    type: "decoration",
    ages: ["bronze"],

    construction: {
      bronze: {
        time: 1000 * 40,
        conditions: {
          gold: 4500,
          food: 1000,
          citizens: 4,
        },
      },
    },
    image: {
      dawn: "",
      stone: "",
      bronze: "images/bronze-hanging-gardens.jpg",
    },
    square: 4,
    quantity: {
      dawn: 0,
      stone: 0,
      bronze: 1,
    },
  },
  {
    id: 11,
    name: "Pyramids",
    type: "decoration",
    ages: ["bronze"],

    construction: {
      bronze: {
        time: 1000 * 40,
        conditions: {
          gold: 3800,
          food: 1000,
          citizens: 4,
        },
      },
    },
    image: {
      dawn: "",
      stone: "",
      bronze: "images/bronze-pyramids.jpg",
    },
    square: 1,
    quantity: {
      dawn: 0,
      stone: 0,
      bronze: 1,
    },
  },
  {
    id: 12,
    name: "Stonehenge",
    type: "decoration",
    ages: ["bronze"],

    construction: {
      bronze: {
        time: 1000 * 40,
        conditions: {
          gold: 2200,
          food: 1000,
          citizens: 4,
        },
      },
    },
    image: {
      dawn: "",
      stone: "",
      bronze: "images/bronze-stonehenge.jpg",
    },
    square: 4,
    quantity: {
      dawn: 0,
      stone: 0,
      bronze: 1,
    },
  },
  {
    id: 13,
    name: "Bush",
    type: "bush",
    image: "images/bush.jpg",
  },
  {
    id: 14,
    name: "Tower",
    type: "decoration",
    ages: ["dawn", "stone", "bronze"],
    construction: {
      dawn: {
        time: 500 * 40,
        conditions: {
          gold: 300,
          food: 0,
          citizens: 3,
        },
      },
      stone: {
        time: 800 * 40,
        conditions: {
          gold: 1500,
          food: 0,
          citizens: 4,
        },
      },
      bronze: {
        time: 1000 * 40,
        conditions: {
          gold: 3000,
          food: 0,
          citizens: 4,
        },
      },
    },
    image: {
      dawn: "images/dawn-tower.jpeg",
      stone: "images/stone-tower.jpeg",
      bronze: "images/bronze-tower.jpeg",
    },
    square: 1,
    quantity: {
      dawn: 1,
      stone: 2,
      bronze: 3,
    },
  },
];

export const getElementInfo = (id) => {
  return elements.find((el) => el.id === id);
};
