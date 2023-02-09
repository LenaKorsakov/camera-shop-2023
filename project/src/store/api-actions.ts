import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Cameras, Promo } from '../@types/camera-types';
import { AppDispatch, State } from '../@types/store-types';

import { Action } from '../const/action';
import { ApiRoute } from '../const/api-route';

export const fetchAllCameras = createAsyncThunk<
Cameras,
undefined,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.FetchAllCameras,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Cameras>(ApiRoute.Cameras);
    return data;
  }
);

export const fetchPromo = createAsyncThunk<
Promo,
undefined,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.FetchAllCameras,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Promo>(ApiRoute.Promo);
    return data;
  }
);
