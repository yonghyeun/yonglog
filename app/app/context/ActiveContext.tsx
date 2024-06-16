'use client';

import { createContext, useState } from 'react';
import type { Headers } from '../lib/interactiveSidebar';

type ActiveContextType = {
  activeList: Headers;
  setActiveList: React.Dispatch<React.SetStateAction<Headers>>;
};

export const ActiveContext = createContext<ActiveContextType>({
  activeList: [],
  setActiveList: () => {},
});

export const ActiveProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeList, setActiveList] = useState<Headers>([]);

  return (
    <ActiveContext.Provider value={{ activeList, setActiveList }}>
      {children}
    </ActiveContext.Provider>
  );
};
