import { HeaderAndMainProps, handleChangeProps } from "./types"

function Header({ name, setName, brand, setBrand, price, setPrice }: HeaderAndMainProps) {
  function handleChangeText({ event, type }: handleChangeProps) {
    const value = event.target.value
      .replace(/[^A-Za-zА-Яа-я\s]/g, '')
      .slice(0, 40)
    type === 'brand' ? setBrand(value) : setName(value)
  }

  function handleChangeNumber({ event }: handleChangeProps) {
    const value = event.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^0+/, '')
      .slice(0, 15)
    setPrice(Number(value))
  }

  return (
    <header className='w-full h-20 flex items-center bg-white px-20'>
      <div className='flex items-center gap-4'>
        <img src='././public/logo.svg' className='h-10 w-10' />
        <h1 className='text-3xl uppercase font-bold text-main-black'>b-store</h1>
      </div>
      <div className='ml-[20rem]'>
        <input type='text' placeholder='name' className='w-60 h-12 border-2 text-lg'
          value={name} onChange={(event) => handleChangeText({ event, type: 'name' })} />
        <input type='text' placeholder='brand' className='w-60 h-12 border-2 text-lg'
          value={brand} onChange={(event) => handleChangeText({ event, type: 'brand' })} />
        <input type='text' placeholder='price' className='w-60 h-12 border-2 text-lg'
          value={price} onChange={(event) => handleChangeNumber({ event })} />
      </div>
    </header>
  )
}

export default Header;
