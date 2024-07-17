import Counter from './components/Counter';
import { CounterProvider } from './store/Provider';
const App = () => {
  return (
    <div className='wrapper'>
      <h1>오늘의 초기값은 5!</h1>
      <CounterProvider externalInitalValue={5}>
        <Counter />
      </CounterProvider>
    </div>
  );
};

export default App;
