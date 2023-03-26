import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchPricesAction } from '../api-actions/api-actions';

import { NameSpace } from '../../const/name-space';
import { QueryKey } from '../../const/query-key';

import { CurrentFilter, FilterData, UserInput } from '../../@types/store-types';

export const initialStateFilter: FilterData = {
  currentFilterCategory: null,
  currentFilterTypes: [],
  currentFilterLevels: [],
  priceFrom: '',
  priceTo: '',
  minPrice: 0,
  maxPrice: 0,
};

export const filterProcess = createSlice({
  name: NameSpace.Filter,
  initialState: initialStateFilter,
  reducers: {
    setCurrentFilterCategory: (state, action: PayloadAction<string | null>) => {
      state.currentFilterCategory = action.payload;
    },
    setCurrentFilterTypes: (state, action: PayloadAction<string>) => {
      state.currentFilterTypes = [...state.currentFilterTypes, action.payload];
    },
    setCurrentFilterLevels: (state, action: PayloadAction<string>) => {
      state.currentFilterLevels = [...state.currentFilterLevels, action.payload];
    },
    setPriceFrom: (state, action: PayloadAction<UserInput>) => {
      state.priceFrom = action.payload;
    },
    setPriceTo: (state, action: PayloadAction<UserInput>) => {
      state.priceTo = action.payload;
    },
    deleteCurrentFilter: (state, action: PayloadAction<CurrentFilter>) => {
      switch(action.payload.key) {
        case (QueryKey.FilterCategory): {
          state.currentFilterCategory = null;
          break;
        }
        case (QueryKey.FilterType): {
          state.currentFilterTypes = state.currentFilterTypes.filter((type) => type !== action.payload.value);
          break;
        }
        case (QueryKey.FilterLevel): {
          state.currentFilterLevels = state.currentFilterLevels.filter((level) => level !== action.payload.value);
          break;
        }
      }
    },
    resetCurrentFilter: (state, action: PayloadAction<QueryKey>) => {
      switch(action.payload) {
        case (QueryKey.FilterCategory): {
          state.currentFilterCategory = null;
          break;
        }
        case (QueryKey.FilterType): {
          state.currentFilterTypes = [];
          break;
        }
        case (QueryKey.FilterLevel): {
          state.currentFilterLevels = [];
          break;
        }
      }
    },
    resetFilters: (state) => {
      state.currentFilterCategory = null;
      state.currentFilterTypes = [];
      state.currentFilterLevels = [];
      state.priceFrom = '';
      state.priceTo = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPricesAction.fulfilled, (state, action) => {
        state.minPrice = action.payload.minPrice;
        state.maxPrice = action.payload.maxPrice;
      });
  },
});

export const {setCurrentFilterCategory, setCurrentFilterTypes, setCurrentFilterLevels, resetFilters, deleteCurrentFilter, setPriceFrom, setPriceTo, resetCurrentFilter} = filterProcess.actions;
