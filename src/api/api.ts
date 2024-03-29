import CryptoJS from 'crypto-js';

const API_URL = 'http://api.valantis.store:40000/';
// we could use .env file, or kind of that to hide password but
// as soon as API seems to be publicly available and the password
// is posted in public documentation it seems to be okay to leave it here
const PASSWORD = 'Valantis';
const CURRENT_DATE = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const xAuth = getXAuth(PASSWORD, CURRENT_DATE);

function getXAuth(password: string, timestamp: string) {
  const hash = CryptoJS.MD5(password + '_' + timestamp);
  return hash.toString();
}

// Filter call
export async function getFilteredIDs(
  name?: string,
  price?: number,
  brand?: string,
  ctrl?: AbortController,
) {
  const params: { product?: string; brand?: string; price?: number } = {};
  if (name) {
    params['product'] = name;
  }
  if (brand) {
    params['brand'] = brand;
  }
  if (price && price !== 0) {
    params['price'] = price;
  }

  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'X-Auth': xAuth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'filter',
      params: params,
    }),
    signal: ctrl?.signal,
  })
    .then((data) => data.json())
    .then((data) => data.result);
}

// GetIds call
export async function getIds(
  offset: number,
  limit: number,
  ctrl?: AbortController,
): Promise<string[]> {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'X-Auth': xAuth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'get_ids',
      params: { offset: offset, limit: limit },
    }),
    signal: ctrl?.signal,
  })
    .then((data) => data.json())
    .then((data) => data.result);
}

export type Card = {
  brand: string;
  id: string;
  price: number;
  product: string;
};

// GetItems call (limit: 100)
export async function getCards(
  ids: string[],
  ctrl?: AbortController,
): Promise<Card[]> {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'X-Auth': xAuth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'get_items',
      params: { ids: ids },
    }),
    signal: ctrl?.signal,
  })
    .then((data) => data.json())
    .then((data) => data.result);
}
