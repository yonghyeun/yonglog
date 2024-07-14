import { useDispatch } from '@/hooks';
import { AddNumber, SubtractNumber } from '@/action';

const Counter = () => {
  console.log('Counter 리렌더링');

  const dispatch = useDispatch();

  const handlePlus = () => {
    dispatch(AddNumber());
  };
  const handleMinus = () => {
    dispatch(SubtractNumber());
  };

  return (
    <div className='flex counter'>
      <button onClick={handlePlus}>+</button>
      <button onClick={handleMinus}>-</button>
    </div>
  );
};

export default Counter;
