import { useSelector } from '@/hooks';

const View = () => {
  console.log('View 리렌더링');
  const count = useSelector((state) => state.counter);

  return <h1 className='view'>{count}</h1>;
};

export default View;
