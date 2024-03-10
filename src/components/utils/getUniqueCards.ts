/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, getCards } from '../../api/api';
import { retry } from './retry';

export async function getUniqueCards(ids: string[], ctrl?: AbortController) {
  const cards = (await retry(getCards)(ids, ctrl)) as Card[];
  const met = new Set();
  const uniq = [];

  for (const card of cards) {
    if (met.has(card.id)) {
      continue;
    }
    met.add(card.id);
    uniq.push(card);
  }
  return uniq;
}
