import { useEffect, useState } from "react";
import { Card } from ".";
import { CardProps } from "./Card";
import { HeaderAndMainProps } from "./types";
import { getUniqueIds } from "./utils/getUniqueIdsDefault";

function Main({ name, setName, brand, setBrand, price, setPrice }: HeaderAndMainProps) {
  const [cards, setCards] = useState<CardProps[]>([])

  function handleClickNext() {
    setCards([])
    getUniqueIds().then((cards) => {
      setCards(cards)
    })
  }

  useEffect(() => {
    getUniqueIds().then((cards) => {
      setCards(cards)
    })
  }, [])

  return (
    <main className="min-h-full w-full flex flex-col justify-center items-center">
      <div className="flex flex-wrap px-20 py-10 justify-between gap-y-6">
        {cards.length > 0 ? cards
          .map((card) => (
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
      </div>
      <button className="bg-white w-52 h-16 mb-10 rounded-xl font-bold"
        onClick={() => handleClickNext()}
      >
        Next
      </button>
    </main>
  )
}

export default Main;
