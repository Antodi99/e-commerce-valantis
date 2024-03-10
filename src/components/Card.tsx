export type CardProps = {
  id: string;
  product: string;
  price: number;
  brand: null | string;
};

function Card({ id, product, price, brand }: CardProps) {
  return (
    <div className="w-80 h-40 bg-white rounded-xl flex p-4 flex-col text-sm justify-between">
      <div>
        <p className="text-base font-bold">{product}</p>
      </div>
      <div className="flex flex-col">
        <p>id: {id}</p>
        <div className="flex flex-row justify-between mt-2">
          <p>Цена: {price}</p>
          <p>Бренд: {brand ? brand : 'Неизвестно'}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
