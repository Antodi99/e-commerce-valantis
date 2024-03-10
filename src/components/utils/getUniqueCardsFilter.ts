// import debounce from 'lodash/debounce'
import { Card as TCard, getFilteredIDs } from '../../api/api';
import { getUniqueCards } from './getUniqueCards';
import { retry } from './retry';
import { debounce } from './debounce';

let offsetHistory: number[] = [];
const uniqIDs = new Map();
let cards: TCard[] = [];
let startFilterPos = 0;
let endFilterPos = 50;

type GetFilteredCardsProps = {
  name?: string;
  price?: number;
  brand?: string;
  ctrl?: AbortController;
  move?: string;
  clear?: boolean;
};

export async function getUniqueCardsFiltered({
  name,
  price,
  brand,
  ctrl,
  move,
  clear = true,
}: GetFilteredCardsProps) {
  if (clear) {
    startFilterPos = 0;
    endFilterPos = 50;
    offsetHistory = [];
    cards = [];
    uniqIDs.clear();
  }

  if (move === 'back' && startFilterPos === 0) {
    return;
  }

  if (move === 'back') {
    if (startFilterPos !== 0 && endFilterPos !== 50) {
      startFilterPos -= 50;
      endFilterPos -= 50;
    }
    return cards.slice(startFilterPos, endFilterPos);
  } else if (move === 'next') {
    if (endFilterPos <= (offsetHistory.length - 1) * 50) {
      startFilterPos += 50;
      endFilterPos += 50;
    }
    return cards.slice(startFilterPos, endFilterPos);
  }

  const ids = (await retry(getFilteredIDs)(
    name,
    price,
    brand,
    ctrl,
  )) as string[];
  const chunk = [];

  offsetHistory.push(0);
  for (let i = 0; i < ids.length; i++) {
    if (!uniqIDs.has(ids[i])) {
      uniqIDs.set(ids[i], offsetHistory[offsetHistory.length - 1]);
      chunk.push(ids[i]);
      if (chunk.length % 50 === 0) {
        offsetHistory.push(chunk.length);
      }
    }
  }
  cards = await getUniqueCards(chunk, ctrl);
  return cards.slice(0, 50);
}

// TODO: debounce should works properly
export const getUniqueCardsFilteredWithDebounce = debounce(
  getUniqueCardsFiltered,
  1500,
);
