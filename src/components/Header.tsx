function Header() {
  return (
    <header className='w-full h-20 flex items-center bg-white px-20'>
      <div className='flex items-center gap-4'>
        <img src='././public/logo.svg' className='h-10 w-10' />
        <h1 className='text-3xl uppercase font-bold text-main-black'>b-store</h1>
      </div>
      <div className='ml-[20rem]'>
        <input type='text' placeholder='Name' className='w-60 h-12 border-2 text-lg' />
        <input type='text' placeholder='Brand' />
        <input type='text' placeholder='Price' />
      </div>
    </header>
  )
}

export default Header;
