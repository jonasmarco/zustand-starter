import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const initialState = {
  count: 0,
};

const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      ...initialState,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set(initialState),
    }),
    {
      name: 'persist-counter',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCounterStore;
