import { useCounterContext } from '@/store/Provider';
const CountView = () => {
  const _useCounter = useCounterContext();
  const count = _useCounter((state) => state.count);
  return <h1>{count}</h1>;
};

const CountButton = () => {
  const _useCounter = useCounterContext();
  const increase = _useCounter((state) => state.increase);
  const decrease = _useCounter((state) => state.decrease);
  const asyncIncrease = _useCounter((state) => state.asyncIncrease);

  return (
    <div className='flex'>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={asyncIncrease}>Async increase</button>
    </div>
  );
};

const CountChange = () => {
  const _useCounter = useCounterContext();

  const changeDiff = _useCounter((state) => state.changeDiff);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeDiff(e.target.value);
  };

  return (
    <div className='flex'>
      <label htmlFor='increase'>increase : </label>
      <input type='text' onChange={handleChange} />
    </div>
  );
};

const Counter = () => {
  return (
    <div>
      <CountView />
      <CountButton />
      <CountChange />
    </div>
  );
};

export default Counter;
