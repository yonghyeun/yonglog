import { createContext, useContext, useRef } from 'react';
import useCounter from './useCounter';
import { createDependentStore } from './custom';

const CounterContext = createContext<typeof useCounter | null>(null);
export const CounterProvider = ({
  children,
  externalInitalValue,
}: {
  children: React.ReactNode;
  externalInitalValue: number;
}) => {
  const counterStore = useRef(
    createDependentStore({ count: externalInitalValue }),
  );
  return (
    <CounterContext.Provider value={counterStore.current}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounterContext = () => {
  const _useCounter = useContext(CounterContext);
  if (!_useCounter) {
    throw new Error('Counter 컨텍스트 내에서만 사용해야 합니다.');
  }

  return _useCounter;
};
