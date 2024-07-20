import { create } from 'zustand';

type State = {
  token: string;
  userName: string;
};

type Action = {
  setToken: (newToken: string) => void;
  setUserName: (userName: string) => void;
};

const useSessionStore = create<State & Action>((set) => ({
  token: '',
  userName: '',
  setToken: (newToken) => set({ token: newToken }),
  setUserName: (userName) => set({ userName }),
}));

export default useSessionStore;
