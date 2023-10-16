import { useDraggable } from "@dnd-kit/core";
import PropTypes from "prop-types";

const DraggableBuilding = ({ id, building, buildings }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x + 40}px, ${
          transform.y + 40
        }px, 0)`,
        touchAction: "none",
      }
    : undefined;

  return (
    <div
      className="dragable-building"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <img src={`/${building.image}`} alt={building.name} draggable="false" />
      <p>{building.name}</p>
    </div>
  );
};

DraggableBuilding.propTypes = {
  id: PropTypes.number,
  building: PropTypes.any,
  buildings: PropTypes.any,
};

export default DraggableBuilding;
