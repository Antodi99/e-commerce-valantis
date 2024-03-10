import { useEffect, useRef, useState } from 'react';
import { Header, Main } from './components';
import { Card } from './api/api';
import { getUniqueCardsFiltered } from './components/utils/getUniqueCardsFilter';
import { getUniqueCardsDefault } from './components/utils/getUniqueCardsDefault';

function App() {
  const [cards, setCards] = useState<Card[]>([])
  const ctrlRef = useRef<AbortController | undefined>()
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState<number>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!name && !brand && !price) {
      setLoading(true)
      ctrlRef.current?.abort()
      ctrlRef.current = new AbortController()
      getUniqueCardsDefault(ctrlRef.current).then((cards) => {
        setLoading(false)
        cards && setCards(cards)
      })
    }
  }, [price, name, brand])

  async function getFilteredCards() {
    setLoading(true)
    ctrlRef.current?.abort()
    ctrlRef.current = new AbortController()
    const cards = await getUniqueCardsFiltered({ name, brand, price, ctrl: ctrlRef.current }).catch()
    setLoading(false)
    cards && setCards(cards)
  }

  async function handleClickNext() {
    setLoading(true)
    ctrlRef.current?.abort()
    ctrlRef.current = new AbortController()
    if (!name && !brand && !price) {
      const cards = await getUniqueCardsDefault(ctrlRef.current, false).catch()
      setLoading(false)
      cards && setCards(cards)
    } else {
      const cards = await getUniqueCardsFiltered({ name, brand, price, ctrl: ctrlRef.current, move: 'next', clear: false }).catch()
      setLoading(false)
      cards && setCards(cards)
    }
  }

  async function handleClickPrev() {
    setLoading(true)
    ctrlRef.current?.abort()
    ctrlRef.current = new AbortController()
    if (!name && !brand && !price) {
      const cards = await getUniqueCardsDefault(ctrlRef.current, false, true).catch()
      setLoading(false)
      cards && setCards(cards)
    } else {
      const cards = await getUniqueCardsFiltered({ name, brand, price, ctrl: ctrlRef.current, move: 'back', clear: false }).catch()
      setLoading(false)
      cards && setCards(cards)
    }
  }

  return (
    <div>
      <Header name={name} setName={setName} brand={brand} setBrand={setBrand} price={price} setPrice={setPrice} getFilteredCards={getFilteredCards} />
      <Main cards={cards} handleClickNext={handleClickNext} handleClickPrev={handleClickPrev} loading={loading} />
    </div>
  );
}

export default App;
