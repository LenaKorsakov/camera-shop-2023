import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/name-space';

import { AppData } from '../../@types/store-types';

export const initialStateApp: AppData = {
  currentParams: '',
  camerasCount: 0
};

export const appProcess = createSlice({
  name: NameSpace.APP,
  initialState: initialStateApp,
  reducers: {
    setCurrentParams: (state, action: PayloadAction<string>) => {
      state.currentParams = action.payload;
    },
    setCamerasCount: (state, action: PayloadAction<number>) => {
      state.camerasCount = action.payload;
    }
  }
});

export const {setCurrentParams, setCamerasCount} = appProcess.actions;
