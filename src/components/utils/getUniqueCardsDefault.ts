import { getIds } from '../../api/api';
import { getUniqueCards } from './getUniqueCards';
import { retry } from './retry';

const uniqIDs = new Map();
const limit = 60;
let offset = 0;
let offsetHistory: number[] = [];

export async function getUniqueCardsDefault(
  ctrl?: AbortController,
  flush = true,
  back = false,
) {
  if (back && offsetHistory.length === 1) {
    return;
  }
  if (flush) {
    offset = 0;
    uniqIDs.clear();
    offsetHistory = [];
  }

  if (back) {
    if (offsetHistory.length > 2) {
      offset = offsetHistory[offsetHistory.length - 2];
    } else {
      offset = 0;
    }
    for (const [key, value] of uniqIDs.entries()) {
      if (value >= offset) {
        uniqIDs.delete(key);
      }
    }
    offsetHistory = offsetHistory.slice(0, offsetHistory.length - 2);
  }

  offsetHistory.push(offset);
  const ids = (await retry(getIds)(offset, limit, ctrl)) as string[];
  const chunk = [];

  for (let i = 0; i < ids.length; i++) {
    offset++;
    if (!uniqIDs.has(ids[i])) {
      uniqIDs.set(ids[i], offsetHistory[offsetHistory.length - 1]);
      chunk.push(ids[i]);
      if (chunk.length === 50) {
        offset++;
        break;
      }
    }
  }

  return getUniqueCards(chunk, ctrl);
}
