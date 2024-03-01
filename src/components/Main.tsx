import { useEffect, useState } from "react";
import { Card } from ".";
import { getFilteredItems } from "../api/api";
import { CardProps } from "./Card";
function Main() {
  const [cards, setCards] = useState<CardProps[]>([])

  useEffect(() => {
    getFilteredItems().then(async (data) => {
      setCards(data)
    })
  }, [])

  return (
    <main className="min-h-full w-full flex flex-wrap px-20 py-10 justify-between gap-y-6">
      {cards.length > 0 ? cards.map((card) => (
        <Card
          id={card.id}
          key={card.id}
          product={card.product}
          price={card.price}
          brand={card.brand}
        />
      ))
        : <div>Loading...</div>
      }
    </main>
  )
}

export default Main;
