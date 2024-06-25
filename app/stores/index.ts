import { create } from 'zustand';
import { AppState } from './types/transfer';

export const useVTransfer = create<AppState>((set) => ({
  count: 1,
  meta: 1,
  increase: () => {
    return set((state) => ({
      count: state.count + 1,
      meta: state.meta + 1,
    }));
  },
  decrese: () => {
    return set((state) => {
      if (state.count === 0) {
        return {};
      }
      return {
        count: state.count - 1,
      };
    });
  },
  reset: () => {
    return set((state) => ({
      count: 0,
      meta: 0,
    }));
  },
}));
