import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialCards = [
  { id: "1", content: "Card 1" },
  { id: "2", content: "Card 2" },
  { id: "3", content: "Card 3" },
  { id: "4", content: "Card 4" },
];

export default function CardToCardDnD() {
  const [cards, setCards] = useState(initialCards);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // If no destination, do nothing
    if (!destination) return;

    // Swap cards
    const updatedCards = [...cards];
    const [removed] = updatedCards.splice(source.index, 1);
    updatedCards.splice(destination.index, 0, removed);

    setCards(updatedCards);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-center text-3xl font-bold mb-6">
        Card-to-Card Drag and Drop
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="cards" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-6 justify-center"
            >
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-6 w-40 h-40 flex items-center justify-center rounded-lg shadow-md text-lg font-bold transition-all duration-300 ${
                        snapshot.isDragging
                          ? "bg-blue-300 scale-105"
                          : "bg-white"
                      } ${
                        snapshot.isDropAnimating
                          ? "bg-green-200"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {card.content}
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
