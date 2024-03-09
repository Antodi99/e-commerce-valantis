import { Card } from ".";
import { Card as TCard } from "../api/api";

type MainProps = {
  cards: TCard[]
  handleClickNext: () => void
  handleClickPrev: () => void
  loading: boolean
}

function Main({ cards, handleClickNext, handleClickPrev, loading }: MainProps) {
  return (
    <main className="min-h-full w-full flex flex-col justify-center items-center">
      <div className="flex flex-wrap px-20 py-10 gap-x-6 w-full gap-y-6">
        {!loading ? cards
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
      <div className="flex gap-8">
        <button className="bg-white w-52 h-16 mb-10 rounded-xl font-bold"
          onClick={() => handleClickPrev()}
        >
          Prev
        </button>
        <button className="bg-white w-52 h-16 mb-10 rounded-xl font-bold"
          onClick={() => handleClickNext()}
        >
          Next
        </button>
      </div>
    </main>
  )
}

export default Main;
