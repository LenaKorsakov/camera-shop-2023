import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/name-space';

import { CurrentFilter, FilterData } from '../../@types/store-types';
import { Query } from '../../const/query';

export const initialStateFilter: FilterData = {
  currentFilterCategory: '',
  currentFilterTypes: [],
  currentFilterLevels: [],
  minPrice: 0,
  maxPrice: 0,
};

export const filterProcess = createSlice({
  name: NameSpace.Filter,
  initialState: initialStateFilter,
  reducers: {
    changeCurrentFilterCategory: (state, action: PayloadAction<string>) => {
      state.currentFilterCategory = action.payload;
    },
    changeCurrentFilterTypes: (state, action: PayloadAction<string>) => {
      state.currentFilterTypes = [...state.currentFilterTypes, action.payload];
    },
    changeCurrentFilterLevels: (state, action: PayloadAction<string>) => {
      state.currentFilterLevels = [...state.currentFilterLevels, action.payload];
    },
    deleteCurrentFilter: (state, action: PayloadAction<CurrentFilter>) => {
      switch(action.payload.key) {
        case (Query.FilterCategory): {
          state.currentFilterCategory = '';
          break;
        }
        case (Query.FilterType): {
          state.currentFilterTypes.filter((type) => type !== action.payload.value);
          break;
        }
        case (Query.FilterLevel): {
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

export const {changeCurrentFilterCategory, changeCurrentFilterTypes, changeCurrentFilterLevels, resetFilters} = filterProcess.actions;
