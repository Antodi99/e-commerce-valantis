import { useState } from 'react';
import { Header, Main } from './components';

function App() {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState<number>()

  return (
    <div>
      <Header name={name} setName={setName} brand={brand} setBrand={setBrand} price={price} setPrice={setPrice} />
      <Main name={name} setName={setName} brand={brand} setBrand={setBrand} price={price} setPrice={setPrice}/>
    </div>
  );
}

export default App;
