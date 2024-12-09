
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";



const initialCards = [
  { id: 1, name: "Card 1", category: "Frames" },
  { id: 2, name: "Card 2", category: "Tooltips" },
  { id: 3, name: "Card 3", category: "Tooltips" },
  { id: 6, name: "Card 6", category: "Tooltips" },
  { id: 7, name: "Card 7", category: "Tooltips" },
  { id: 5, name: "Card 5", category: "Tooltips" },
  { id: 4, name: "Card 4", category: "Frames" },
];

export const loader: LoaderFunction = async () => {
  return json(initialCards);
};
