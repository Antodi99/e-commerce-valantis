import { useEffect, useState } from "react";
import { Card } from ".";
import { getIds, getItems } from "../api/api";
import { CardProps } from "./Card";
import { HeaderAndMainProps } from "./types";

const uniqIDs = new Set()
const uniqIDsCards = new Set()
const limit = 60
let offset = 0

function Main({ name, setName, brand, setBrand, price, setPrice }: HeaderAndMainProps) {
  const [cards, setCards] = useState<CardProps[]>([])

  async function getUniqueIds() {
    const ids = await getIds(offset, limit);
    const chunk = []

    for (let i = 0; i < ids.length; i++) {
      if (!uniqIDs.has(ids[i])) {
        uniqIDs.add(ids[i])
        chunk.push(ids[i])

        if (chunk.length === 50) {
          offset += i;
          break;
        }
      }
    }

    const allCards = await getItems(chunk)
    const cards = []

    for (let i = 0; i < allCards.length; i++) {
      if (!uniqIDsCards.has(allCards[i].id)) {
        uniqIDsCards.add(allCards[i].id)
        cards.push(allCards[i])
        if (cards.length === 50) {
          break;
        }
      }
    }
    return cards
  }

  function handleClick() {
    setCards([])
    getUniqueIds().then((cards) => {
      setCards(cards)
    })
  }

  useEffect(() => {
    getUniqueIds().then((cards) => {
      console.log(cards.length)
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
        onClick={() => handleClick()}
      >
        Next
      </button>
    </main>
  )
}

export default Main;
