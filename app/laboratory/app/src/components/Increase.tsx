import { changeIncrease } from '@/action';
import { useDispatch } from '@/hooks';
const Increase = () => {
  console.log('Increase 리렌더링');
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeIncrease(e.target.value));
  };

  return (
    <div className='flex increase'>
      <label htmlFor=''>Amount : </label>
      <input type='text' defaultValue={1} onChange={handleChange} />
    </div>
  );
};

export default Increase;
