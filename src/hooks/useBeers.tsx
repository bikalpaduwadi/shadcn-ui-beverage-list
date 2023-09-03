import { create } from 'zustand';

import Product from '@/domains/product';

export interface BeerState {
  data: Product[];
  setData: (value: Product[]) => void;
}

export interface AllBeerState extends BeerState {
  page: number;
  setPage: (value: number) => void;
}

const useMyBeerState = create<BeerState>((set) => ({
  data: [],
  setData: (value) => set((state) => ({ data: [...state.data, ...value] })),
}));

const useAllBeerState = create<AllBeerState>((set) => ({
  page: 1,
  data: [],
  setPage: (value) => set({ page: value }),
  setData: (value) => set({ data: value }),
}));

export { useAllBeerState, useMyBeerState };
