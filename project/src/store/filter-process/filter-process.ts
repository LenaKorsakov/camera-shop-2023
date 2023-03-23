import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/name-space';
import { QueryKey } from '../../const/query-key';

import { CurrentFilter, FilterData } from '../../@types/store-types';

export const initialStateFilter: FilterData = {
  currentFilterCategory: null,
  currentFilterTypes: [],
  currentFilterLevels: [],
  minPrice: 0,
  maxPrice: 0,
};

export const filterProcess = createSlice({
  name: NameSpace.Filter,
  initialState: initialStateFilter,
  reducers: {
    setCurrentFilterCategory: (state, action: PayloadAction<string>) => {
      state.currentFilterCategory = action.payload;
    },
    setCurrentFilterTypes: (state, action: PayloadAction<string>) => {
      state.currentFilterTypes = [...state.currentFilterTypes, action.payload];
    },
    setCurrentFilterLevels: (state, action: PayloadAction<string>) => {
      state.currentFilterLevels = [...state.currentFilterLevels, action.payload];
    },
    deleteCurrentFilter: (state, action: PayloadAction<CurrentFilter>) => {
      switch(action.payload.key) {
        case (QueryKey.FilterCategory): {
          state.currentFilterCategory = '';
          break;
        }
        case (QueryKey.FilterType): {
          state.currentFilterTypes.filter((type) => type !== action.payload.value);
          break;
        }
        case (QueryKey.FilterLevel): {
          state.currentFilterLevels.filter((level) => level !== action.payload.value);
          break;
        }
      }
    },
    resetFilters: (state) => {
      state.currentFilterCategory = '';
      state.currentFilterTypes = [];
      state.currentFilterLevels = [];
      state.minPrice = 0;
      state.maxPrice = 0;
    }
  }
});

export const {setCurrentFilterCategory, setCurrentFilterTypes, setCurrentFilterLevels, resetFilters, deleteCurrentFilter} = filterProcess.actions;
