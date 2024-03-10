type HeaderProps = {
  name: string | undefined;
  setName: React.Dispatch<React.SetStateAction<string>>;
  brand: string | undefined;
  setBrand: React.Dispatch<React.SetStateAction<string>>;
  price: number | undefined;
  setPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  getFilteredCards: () => Promise<void>;
};

type HandleChangeProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  type?: string;
};

function Header({
  name,
  setName,
  brand,
  setBrand,
  price,
  setPrice,
  getFilteredCards,
}: HeaderProps) {
  function handleChangeText({ event, type }: HandleChangeProps) {
    const value = event.target.value
      .replace(/[^A-Za-zА-Яа-я\s]/g, '')
      .slice(0, 40);
    type === 'brand' ? setBrand(value) : setName(value);
  }

  function handleChangeNumber({ event }: HandleChangeProps) {
    const value = event.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^0+/, '')
      .slice(0, 15);
    setPrice(Number(value));
  }

  return (
    <header className="w-full h-20 flex items-center bg-white px-20">
      <div className="flex items-center gap-4">
        <img src="././public/logo.svg" className="h-10 w-10" />
        <h1 className="text-3xl uppercase font-bold text-main-black">
          b-store
        </h1>
      </div>
      <div className="ml-[10rem] flex flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Name"
          className="w-60 h-12 border-2 text-lg rounded-md border-main-black"
          value={name}
          onChange={(event) => handleChangeText({ event, type: 'name' })}
        />
        <input
          type="text"
          placeholder="Brand"
          className="w-60 h-12 border-2 text-lg rounded-md border-main-black"
          value={brand}
          onChange={(event) => handleChangeText({ event, type: 'brand' })}
        />
        <input
          type="text"
          placeholder="Price"
          className="w-60 h-12 border-2 text-lg rounded-md border-main-black"
          value={price}
          onChange={(event) => handleChangeNumber({ event })}
        />
        <button
          className="bg-main-black w-24 h-10 rounded-full p-4 flex justify-center items-center text-white select-none 
        hover:bg-white hover:text-main-black hover:border-2 hover:border-main-black"
          onClick={() => getFilteredCards()}
        >
          <i className="fa-solid fa-magnifying-glass mr-2"></i>
          Filter
        </button>
      </div>
    </header>
  );
}

export default Header;
