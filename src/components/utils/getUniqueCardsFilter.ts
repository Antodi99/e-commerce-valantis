// import debounce from 'lodash/debounce'
import { Card as Tcard, getFilteredIDs } from "../../api/api";
import { getUniqueCards } from "./getUniqueCards";
import { retry } from "./retry";
import { debounce } from './debounce'

const uniqIDs = new Map()
let offset = 0
const offsetHistory: number[] = []
let cards: Tcard[] = []

type GetFilteredCardsProps = {
  name?: string,
  price?: number,
  brand?: string,
  ctrl?: AbortController,
}

export async function getUniqueCardsFiltered({ name, price, brand, ctrl }: GetFilteredCardsProps): Promise<Card[]> {
  const ids = await (retry(getFilteredIDs))(name, price, brand, ctrl) as string[]
  const chunk = []

  for (let i = 0; i < ids.length; i++) {
    offset++;
    if (!uniqIDs.has(ids[i])) {
      uniqIDs.set(ids[i], offsetHistory[offsetHistory.length - 1])
      chunk.push(ids[i])
      if (chunk.length % 50 === 0) {
        offsetHistory.push((chunk.length / 50) * 50)
      }
    }
  }

  cards = await getUniqueCards(chunk, ctrl)
  return cards
}

export const getUniqueCardsFilteredWithDebounce = debounce(getUniqueCardsFiltered, 1500)
