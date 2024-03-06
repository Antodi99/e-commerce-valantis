import { useEffect, useState } from "react";
import { Card } from ".";
import { HeaderAndMainProps } from "./types";
import { getUniqueIds } from "./utils/getUniqueIdsDefault";
import { getFilteredItems, getCards, Card as TCard } from "../api/api";
import { retry } from "./utils/retry";


function Main({ name, setName, brand, setBrand, price, setPrice }: HeaderAndMainProps) {
  const [cards, setCards] = useState<TCard[]>([])

  function handleClickNext() {
    setCards([])
    getUniqueIds().then((cards) => {
      setCards(cards)
    })
  }

  useEffect(() => {
    if (!name && !brand && !price) {
      setCards([])
      getUniqueIds(true).then((cards) => {
        setCards(cards)
      })
    } else {
      setCards([])
      retry(getFilteredItems)(name, price, brand).then(async (ids: unknown) => {
        const data = await (retry(getCards)(ids))
        setCards(data as TCard[])
      })
    }
  }, [brand, name, price])

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
