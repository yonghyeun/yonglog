import View from './components/View';
import Counter from './components/Counter';
import Increase from './components/Increase';
const App = () => {
  return (
    <div>
      <View />
      <div className='flex'>
        <Counter />
        <Increase />
      </div>
    </div>
  );
};

export default App;
