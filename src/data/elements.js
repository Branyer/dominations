export const elements = [
  {
    id: 1,
    name: "Town Center",
    type: "building",
    ages: ["dawn", "stone", "bronze"],

    image: {
      dawn: "public/images/dawn-town-center.png",
      stone: "public/images/stone-town-center.png",
      bronze: "public/images/bronze-town-center.jpg",
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
          gold: 300,
          food: 200,
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
      dawn: "public/images/pile-of-sticks.png",
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
    conditions: {
      dawn: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      stone: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      bronze: {
        gold: 50,
        food: 0,
        citizens: 0,
      },
    },
    image: {
      dawn: "public/images/dawn-house.png",
      stone: "public/images/stone-house.jpg",
      bronze: "public/images/bronze-house.jpg",
    },
    square: 1,
    quantity: {
      dawn: 3,
      stone: 3,
      bronze: 4,
    },
    construction: {
      dawn: {
        time: 120000,
        citizens: 2,
      },
      stone: {
        time: 240000,
        citizens: 2,
      },
      bronze: {
        time: 480000,
        citizens: 2,
      },
    },
  },
  {
    id: 4,
    name: "Market",
    type: "gold",
    ages: ["stone", "bronze"],
    conditions: {
      dawn: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      stone: {
        gold: 0,
        food: 500,
        citizens: 4,
      },
      bronze: {
        gold: 0,
        food: 1400,
        citizens: 4,
      },
    },
    image: {
      dawn: "",
      stone: "public/images/stone-market.jpg",
      bronze: "public/images/bronze-market.jpg",
    },
    square: 4,
    quantity: {
      dawn: 0,
      stone: 1,
      bronze: 2,
    },
    harvest: {
      dawn: {
        time: 0,
        citizens: 0,
      },
      stone: {
        time: 480000,
        citizens: 2,
      },
      bronze: {
        time: 960000,
        citizens: 2,
      },
    },
  },
  //   {
  //     id: 5,
  //     name: "Mill",
  //     type:"food",
  //     conditions: {
  //       dawn: {
  //         gold: 0,
  //         food: 0,
  //         citizens: 0,
  //       },
  //       stone: {
  //         gold: 500,
  //         food: 0,
  //         citizens: 4,
  //       },
  //       bronze: {
  //         gold: 1400,
  //         food: 0,
  //         citizens: 4,
  //       },
  //     },
  //     image: {
  //       dawn: "",
  //       stone: "public/images/stone-mill.jpg",
  //       bronze: "public/images/bronze-mill.jpg",
  //     },
  //     square: 1,
  //     quantity: {
  //       dawn: 0,
  //       stone: 1,
  //       bronze: 2,
  //     },
  //   },
  {
    id: 6,
    name: "Farm",
    type: "food",
    ages: ["bronze"],
    conditions: {
      dawn: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      stone: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      bronze: {
        gold: 500,
        food: 100,
        citizens: 2,
      },
    },
    image: {
      dawn: "",
      stone: "",
      bronze: "public/images/bronze-farm.jpg",
    },
    square: 4,
    quantity: {
      dawn: 0,
      stone: 0,
      bronze: 2,
    },
    harvest: {
      dawn: {
        time: 0,
        citizens: 0,
      },
      stone: {
        time: 0,
        citizens: 0,
      },
      bronze: {
        time: 60000,
        citizens: 2,
      },
    },
  },
  {
    id: 7,
    name: "Fruit tree",
    type: "food",
    ages: ["dawn", "stone", "bronze"],
    conditions: {
      dawn: {
        gold: 0,
        food: 0,
        citizens: 2,
      },
      stone: {
        gold: 0,
        food: 0,
        citizens: 2,
      },
      bronze: {
        gold: 0,
        food: 0,
        citizens: 2,
      },
    },
    image: {
      dawn: "public/images/fruit-tree.jpg",
      stone: "public/images/fruit-tree.jpg",
      bronze: "public/images/fruit-tree.jpg",
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
    conditions: {
      dawn: {
        gold: 0,
        food: 0,
        citizens: 2,
      },
      stone: {
        gold: 0,
        food: 0,
        citizens: 2,
      },
      bronze: {
        gold: 0,
        food: 0,
        citizens: 2,
      },
    },
    image: {
      dawn: "public/images/gold-mine.jpg",
      stone: "public/images/gold-mine.jpg",
      bronze: "public/images/gold-mine.jpg",
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
        gold: 60,
      },
      bronze: {
        time: 1000 * 40,
        citizens: 2,
        gold: 70,
      },
    },
  },
  {
    id: 9,
    name: "Acropolis",
    type: "decoration",
    ages: ["bronze"],
    conditions: {
      dawn: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      stone: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      bronze: {
        gold: 1000,
        food: 0,
        citizens: 0,
      },
    },
    image: {
      dawn: "",
      stone: "",
      bronze: "public/images/bronze-acropolis.jpg",
    },
    square: 4,
    quantity: {
      dawn: 0,
      stone: 0,
      bronze: 1,
    },
  },
  {
    id: 10,
    name: "Hanging Gardens",
    type: "decoration",
    ages: ["bronze"],
    conditions: {
      dawn: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      stone: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      bronze: {
        gold: 4500,
        food: 0,
        citizens: 0,
      },
    },
    image: {
      dawn: "",
      stone: "",
      bronze: "public/images/bronze-hanging-gardens.jpg",
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
    conditions: {
      dawn: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      stone: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      bronze: {
        gold: 3800,
        food: 0,
        citizens: 0,
      },
    },
    image: {
      dawn: "",
      stone: "",
      bronze: "public/images/bronze-pyramids.jpg",
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
    conditions: {
      dawn: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      stone: {
        gold: 0,
        food: 0,
        citizens: 0,
      },
      bronze: {
        gold: 2200,
        food: 0,
        citizens: 0,
      },
    },
    image: {
      dawn: "",
      stone: "",
      bronze: "public/images/bronze-stonehenge.jpg",
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
    image: "public/images/bush.jpg",
  },
];

export const getElementInfo = (id) => {
  return elements.find((el) => el.id === id);
};
