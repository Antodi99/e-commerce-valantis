import { getIds, getCards, Card } from "../../api/api";
import { retry } from "./retry";

const uniqIDs = new Set()
const uniqIDsCards = new Set()
const limit = 60
let offset = 0

export async function getUniqueIds(flush = false) {
  if (flush) {
    offset = 0
    uniqIDs.clear()
    uniqIDsCards.clear()
  }

  const ids = await (retry(getIds))(offset, limit) as string[]
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

  const allCards = await (retry(getCards))(chunk) as Card[]
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
