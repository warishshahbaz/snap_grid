import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import UserCard from "~/components/card";

type CardType = {
  id: number;
  name: string;
  category: string;
};

const CARD_TYPE = "CARD";

const initialCards: CardType[] = [
  { id: 1, name: "Card 1", category: "Frames" },
  { id: 2, name: "Card 2", category: "Tooltips" },
  { id: 3, name: "Card 3", category: "Tooltips" },
  { id: 6, name: "Card 6", category: "Tooltips" },
  { id: 7, name: "Card 7", category: "Tooltips" },
  { id: 5, name: "Card 5", category: "Tooltips" },
  { id: 4, name: "Card 4", category: "Frames" },
];

const DragDropComponent: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("Tooltips");

  const moveCard = (id: number, newCategory: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, category: newCategory } : card
      )
    );
  };

  const reorderCard = (draggedId: number, targetId: number) => {
    const draggedIndex = cards.findIndex((card) => card.id === draggedId);
    const targetIndex = cards.findIndex((card) => card.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const updatedCards = [...cards];
      const [draggedCard] = updatedCards.splice(draggedIndex, 1);
      updatedCards.splice(targetIndex, 0, draggedCard);
      setCards(updatedCards);
    }
  };

  const filteredCards = cards.filter(
    (card) =>
      card.category === filter &&
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full p-5 flex flex-col items-center bg-gray-50 min-h-screen">
        {/* Search Bar */}
        <div className="w-full md:w-1/2 mb-4">
          <input
            type="text"
            placeholder="Search cards..."
            className="w-full p-3 rounded-[25px] border border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-6">
          {"Frames Tooltips Body".split(" ").map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Drag-and-Drop Areas */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {filter && (
            <DropZone
              key={filter}
              category={filter}
              moveCard={moveCard}
              reorderCard={reorderCard}
              cards={filteredCards}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
};

// Drop Zone Component
const DropZone: React.FC<{
  category: string;
  moveCard: (id: number, newCategory: string) => void;
  reorderCard: (draggedId: number, targetId: number) => void;
  cards: CardType[];
}> = ({ category, moveCard, reorderCard, cards }) => {
  const [, drop] = useDrop({
    accept: CARD_TYPE,
    drop: (item: { id: number }) => moveCard(item.id, category),
  });

  return (
    <div
      ref={drop}
      className="w-full md:w-[80%] p-4 bg-white rounded-lg shadow-lg min-h-[200px]"
    >
      <h3 className="text-lg font-bold mb-4 text-center">{category}</h3>
      <div className="flex flex-wrap  gap-3">
        {cards.map((card, index) => (
          <DraggableCard
            key={card.id}
            id={card.id}
            name={card.name}
            reorderCard={reorderCard}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

// Draggable Card Component
const DraggableCard: React.FC<{
  id: number;
  name: string;
  reorderCard: (draggedId: number, targetId: number) => void;
  index: number;
}> = ({ id, name, reorderCard }) => {
  const [, drag] = useDrag({
    type: CARD_TYPE,
    item: { id },
  });

  const [, drop] = useDrop({
    accept: CARD_TYPE,
    hover: (item: { id: number }) => {
      if (item.id !== id) {
        reorderCard(item.id, id);
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="  md:w-[32%]  w-full h-[300px] p-3  rounded-lg text-center font-medium cursor-pointer"
    >
      <UserCard
        avatarUrl="https://via.placeholder.com/150"
        name="John Doe"
        summary="A passionate developer who loves building web applications and exploring new technologies."
        createdDate="Created on Dec 8, 2024"
      />
    </div>
  );
};

export default DragDropComponent;
