export type handleChangeProps = {
  event: React.ChangeEvent<HTMLInputElement>
  type?: string
}

export type HeaderAndMainProps = {
  name: string | undefined
  setName: React.Dispatch<React.SetStateAction<string>>
  brand: string | undefined
  setBrand: React.Dispatch<React.SetStateAction<string>>
  price: number | undefined
  setPrice: React.Dispatch<React.SetStateAction<number | undefined>>
}
