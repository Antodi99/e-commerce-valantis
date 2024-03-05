export function retry(cb, delay = 1000, tries = 5) {
  return async function (...args) {
    if (tries <= 0) {
      throw new Error('Max tries expired')
    }
    try {
      const response = await cb(...args)
      const data = await response.json()
      return data.result
    } catch (error) {
      console.log(`Error: ${error}`)
      return retry(cb, delay * 2, tries - 1)(...args)
    }
  }
}
