import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type ItemType = { id: string; content: string };

const initialItems: ItemType[] = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
  { id: "4", content: "Item 4" },
  { id: "5", content: "Item 5" },
];

export default function GridDragDrop() {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    // If dropped outside a valid area, do nothing
    if (!destination) return;

    // Reorder the items array
    const reorderedItems = Array.from(items);
    const [moved] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, moved);

    setItems(reorderedItems);
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">
        Drag-and-Drop Grid
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="grid" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-blue-500 text-white rounded-lg shadow-lg flex items-center justify-center"
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
