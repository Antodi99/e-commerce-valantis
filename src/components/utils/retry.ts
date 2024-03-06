// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CB = (...args: any) => any
export function retry(cb: CB, delay = 1000, tries = 5) {
  return async function (...args: Array<unknown>): Promise<unknown> {
    if (tries <= 0) {
      throw new Error('Max tries expired')
    }
    try {
      const res = await cb(...args) as unknown
      return res
    } catch (error) {
      console.log(`Error: ${error}`)
      return retry(cb, delay * 2, tries - 1)(...args)
    }
  }
}
