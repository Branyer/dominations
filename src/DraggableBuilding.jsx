import { useDraggable } from "@dnd-kit/core";
import PropTypes from "prop-types";

const DraggableBuilding = ({ id, building }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        touchAction: "none",
      }
    : undefined;

  return (
    <button >
      <div
        className="z-10 flex w-24 flex-col items-center justify-center gap-3 rounded-xl border border-cyan-400 py-3 opacity-100 sm:w-32 sm:pb-1 sm:pt-3 lg:aspect-square"
        style={style}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        <img
          src={`/${building.image}`}
          alt={building.name}
          className="w-16 select-none sm:w-24"
          draggable="false"
        />
        <p className="text-xs capitalize sm:text-base">{building.name}</p>
      </div>
    </button>
  );
};

DraggableBuilding.propTypes = {
  id: PropTypes.number,
  building: PropTypes.any,
};

export default DraggableBuilding;
