import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/name-space';

import { ServerTypeValue } from '../../const/sort-type';
import { ServerOrderValue } from '../../const/sort-order';

import { SortData } from '../../@types/store-types';

export const initialStateSort: SortData = {
  currentSortType: null,
  currentSortOrder: null
};

export const sortProcess = createSlice({
  name: NameSpace.Sort,
  initialState: initialStateSort,
  reducers: {
    changeSortType: (state, action: PayloadAction<ServerTypeValue>) => {
      state.currentSortType = action.payload;
    },
    changeSortOrder: (state, action: PayloadAction<ServerOrderValue>) => {
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
