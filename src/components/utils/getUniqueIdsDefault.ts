import { getIds, getItems } from "../../api/api";
import { retry } from "./retry";

const uniqIDs = new Set()
const uniqIDsCards = new Set()
const limit = 60
let offset = 0

export async function getUniqueIds() {
  const ids = await (retry(getIds))(offset, limit)
  const chunk = []

  console.log(ids)

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

  const allCards = await (retry(getItems))(chunk)
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
