import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/name-space';

import { SortByTypeServerValue } from '../../const/sort-by-type';
import { SortByOrderServerValue } from '../../const/sort-by-order';

import { SortData } from '../../@types/store-types';

export const initialStateSort: SortData = {
  currentSortType: null,
  currentSortOrder: null
};

export const sortProcess = createSlice({
  name: NameSpace.Sort,
  initialState: initialStateSort,
  reducers: {
    changeSortType: (state, action: PayloadAction<SortByTypeServerValue>) => {
      state.currentSortType = action.payload;
    },
    changeSortOrder: (state, action: PayloadAction<SortByOrderServerValue>) => {
      state.currentSortOrder = action.payload;
    },
    resetSortType: (state) => {
      state.currentSortType = null;
    },
    resetSortOrder: (state) => {
      state.currentSortOrder = null;
    }
  }
});

export const {changeSortOrder, changeSortType, resetSortType, resetSortOrder} = sortProcess.actions;
