import PropTypes from "prop-types";
import "./App.css";
import { getElementInfo } from "./data/elements";
import { useSnapshot } from "valtio";
import { gameBoardState } from "./state/gameBoardState";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";
import useIntervalHook from "use-interval-hook";

function BuildingGeneral({ data }) {
  const snapBoardState = useSnapshot(gameBoardState);
  const { currentAge } = snapBoardState;
  const [updradeSeconds, setUpgradeSeconds] = useState(0);
  const [constructionSeconds, setConstructionSeconds] = useState(0);

  const {
    square,
    image,
    name,
    upgrade = {},
    construction = {},
  } = getElementInfo(data.buldingId);

  const [i, j] = data.position.split("-");

  const top = i * 42;
  const left = j * 50;
  const inactiveCitizens =
    snapBoardState.resources.citizens - snapBoardState.resources.activeCitizens;

  const upgradeAge = upgrade[currentAge];
  const constructionAge = construction[currentAge];

  const {
    activate: activateUpgrade,
    pause: pauseUpgrage,
    isPaused: isPausedUpdrage,
  } = useIntervalHook({
    interval: 1000,
    callback: () => {
      if (updradeSeconds * 1000 === upgradeAge.time) {
        gameBoardState.upgradeBuilding(data.id, upgradeAge.upgradeTo);

        gameBoardState.resources.activeCitizens =
          snapBoardState.resources.activeCitizens -
          upgradeAge.conditions.citizens;
        setUpgradeSeconds(0);
        pauseUpgrage();
      } else {
        setUpgradeSeconds((s) => s + 1);
      }
    },
    deactivedAtFirst: true,
  });

  const {
    activate: activateConstruction,
    pause: pauseConstruction,
    isPaused: isPausedConstruction,
  } = useIntervalHook({
    interval: 1000,
    callback: () => {
      if (constructionSeconds * 1000 === constructionAge.time) {
        gameBoardState.setConstructionFinished(data.id);

        gameBoardState.resources.activeCitizens =
          snapBoardState.resources.activeCitizens -
          constructionAge.conditions.citizens;

        setConstructionSeconds(0);
        pauseConstruction();
      } else {
        setConstructionSeconds((s) => s + 1);
      }
    },
    deactivedAtFirst: true,
  });

  useEffect(() => {
    if (!data.constructionFinished) {
      gameBoardState.resources.activeCitizens =
        snapBoardState.resources.activeCitizens +
        constructionAge.conditions.citizens;

      gameBoardState.resources.food =
        snapBoardState.resources.food - constructionAge.conditions.food;

      gameBoardState.resources.gold =
        snapBoardState.resources.gold - constructionAge.conditions.gold;

      activateConstruction();
    }
  }, []);

  return (
    <>
      <div
        // title={name}
        style={{
          top,
          left,
          width: square === 1 ? 50 : 50 * 2,
          height: square === 1 ? 42 : 42 * 2,
        }}
        className={"building" + " img-" + data.id}
      >
        <img src={image[currentAge]} alt={name} draggable="false" />

        {upgradeAge ? (
          inactiveCitizens >= upgradeAge.conditions.citizens &&
          snapBoardState.resources.food >= upgradeAge.conditions.food &&
          snapBoardState.resources.gold >= upgradeAge.conditions.gold &&
          isPausedUpdrage &&
          isPausedConstruction ? (
            <button
              onClick={() => {
                if (
                  snapBoardState.resources.citizens -
                    snapBoardState.resources.activeCitizens >
                  0
                ) {
                  gameBoardState.resources.activeCitizens =
                    snapBoardState.resources.activeCitizens +
                    upgradeAge.conditions.citizens;

                  gameBoardState.resources.food =
                    snapBoardState.resources.food - upgradeAge.conditions.food;

                  gameBoardState.resources.gold =
                    snapBoardState.resources.gold - upgradeAge.conditions.gold;

                  activateUpgrade();
                }
              }}
              title="upgrade"
              className="upgrade-building"
            >
              🔨
            </button>
          ) : null
        ) : null}

        {!isPausedUpdrage ? (
          <div title="seconds to upgrade" className="count-work">
            {updradeSeconds}
          </div>
        ) : null}
        {!isPausedConstruction ? (
          <div title="seconds to finish" className="count-work">
            {constructionSeconds}
          </div>
        ) : null}
      </div>
      <Tooltip anchorSelect={".img-" + data.id} clickable>
        <div>
          <span>{name}</span>
          {upgradeAge ? (
            <>
              <p>
                Upgrade: Food {upgradeAge.conditions.food}, Citizens{" "}
                {upgradeAge.conditions.citizens}
              </p>
              <p>Time: {upgradeAge.time / 1000}s </p>
            </>
          ) : null}
        </div>
      </Tooltip>
    </>
  );
}

BuildingGeneral.propTypes = {
  data: PropTypes.any,
};

export default BuildingGeneral;
