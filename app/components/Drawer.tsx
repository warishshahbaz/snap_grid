import { useDrag } from "react-dnd";

const DraggableComponent = ({ type }: { type: string }) => {
  const [, drag] = useDrag({
    type: "component",
    item: { type },
  });

  return (
    <div ref={drag} className="p-2 border rounded bg-gray-200">
      {type}
    </div>
  );
};

export const Drawer = () => {
  return (
    <div className="p-4 border-r">
      <h3 className="font-bold mb-2">Components</h3>
      {["ProgressBar", "Timer", "Question", "Options"].map((type) => (
        <DraggableComponent key={type} type={type} />
      ))}
    </div>
  );
};
