import CryptoJS from 'crypto-js';

const API_URL = 'http://api.valantis.store:40000/'
const PASSWORD = 'Valantis'
const CURRENT_DATE = new Date().toISOString().slice(0, 10).replace(/-/g, '')
const xAuth = getXAuth(PASSWORD, CURRENT_DATE);

function getXAuth(password: string, timestamp: string) {
  const hash = CryptoJS.MD5(password + '_' + timestamp);
  return hash.toString();
}

// Filter call
export async function getFilteredItems(product: string, price: number, brand: string) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "X-Auth": xAuth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "action": "filter",
        "params": { "product": product, "price": price, "brand": brand }
      })
    })
    const dataIds = await response.json()
    return dataIds.result
  } catch (err) {
    console.log(err)
  }
}

// GetIds call
export async function getIds(offset: number, limit: number) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "X-Auth": xAuth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "action": "get_ids",
        "params": { "offset": offset, "limit": limit }
      })
    })
    const data = await response.json()
    return data.result
  } catch (err) {
    console.log(err)
  }
}

// GetItems call (limit: 100)
export async function getItems(ids: string[]) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "X-Auth": xAuth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "action": "get_items",
        "params": { "ids": ids }
      })
    })
    const data = await response.json()
    return data.result
  } catch (err) {
    console.log(err)
  }
}
