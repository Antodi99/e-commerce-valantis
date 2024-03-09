// , res: (...args: any) => any, rej: (err: Error) => void
/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce(cb: any, delay = 2000) {
  let timerId: number | undefined
  return async (...args: any) => {
    console.log('debounce')
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      console.log('calling...')
      cb(...args)
    }, delay)
  }
}
