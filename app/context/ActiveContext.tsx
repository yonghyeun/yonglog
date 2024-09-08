'use client';

import { createContext, useContext, useState } from 'react';

type ActiveContextType = {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const ActiveContext = createContext<ActiveContextType>({
  activeIndex: 0,
  setActiveIndex: () => {},
});

export const ActiveProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <ActiveContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </ActiveContext.Provider>
  );
};

export const useActiveContext = () => {
  return useContext(ActiveContext);
};
