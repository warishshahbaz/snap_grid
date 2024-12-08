import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Initial card data
const initialCards = [
  { id: "1", content: "Card 1" },
  { id: "2", content: "Card 2" },
  { id: "3", content: "Card 3" },
  { id: "4", content: "Card 4" },
];
function isBrowser() {
  return typeof window !== "undefined";
}

export default function CardToCardDnD() {
  const [cards, setCards] = useState(initialCards);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(isBrowser());
  }, []);

  // Handles the drag-and-drop logic
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // If dropped outside of a valid drop area, do nothing
    if (!destination) return;

    // Reorder the cards
    const reorderedCards = Array.from(cards);
    const [movedCard] = reorderedCards.splice(source.index, 1);
    reorderedCards.splice(destination.index, 0, movedCard);

    setCards(reorderedCards);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-center text-3xl font-bold mb-6">Drag & Drop Cards</h1>

      {isClient ? <CardToCardDnD /> : null}
    </div>
  );
}
