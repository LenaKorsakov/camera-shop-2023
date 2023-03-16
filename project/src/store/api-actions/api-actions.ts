import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Camera, Cameras, Promo } from '../../@types/camera-types';
import { AppDispatch, State } from '../../@types/store-types';

import { Action } from '../../const/action';
import { ApiRoute } from '../../const/api-route';
import { ReviewPost, ReviewsRaw } from '../../@types/review-types';
import { Query } from '../../const/query';

const getParams = (state: State) => ({
  [Query.SortOrder]: state.SORT.currentSortOrder,
  [Query.SortType]: state.SORT.currentSortType
});

export const fetchAllCameraAction = createAsyncThunk<
Cameras,
undefined,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.FetchAllCameras,
  async (_arg, {getState, extra: api}) => {
    const state = getState();
    const params = getParams(state);
    // eslint-disable-next-line no-console
    console.log(params);
    const { data } = await api.get<Cameras>(ApiRoute.Cameras, {params});

    return data;
  }
);

export const fetchSearchCameraAction = createAsyncThunk<
Cameras,
string,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.FetchSearchCameras,
  async (value, {extra: api}) => {
    const params = {[Query.Search]: value};

    const { data } = await api.get<Cameras>(ApiRoute.Cameras, {params});

    return data;
  }
);

export const fetchPromoAction = createAsyncThunk<
Promo,
undefined,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.FetchPromo,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Promo>(ApiRoute.Promo);

    return data;
  }
);

export const fetchCameraByIdAction = createAsyncThunk<
Camera,
number,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.FetchCameraById,
  async (id, {extra: api}) => {
    const { data } = await api.get<Camera>(`${ApiRoute.Cameras}/${id}`);

    return data;
  }
);

export const fetchSimilarCamerasAction = createAsyncThunk<
Cameras,
number,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.FetchSimilarCameras,
  async (id, {extra: api}) => {
    const { data } = await api.get<Cameras>(`${ApiRoute.Cameras}/${id}/similar`);

    return data;
  }
);

export const fetchReviewsByIdAction = createAsyncThunk<
ReviewsRaw,
number,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.FetchReviewsById,
  async (id, {extra: api}) => {
    const { data } = await api.get<ReviewsRaw>(`${ApiRoute.Cameras}/${id}/reviews`);

    return data;
  }
);

export const sendReviewAction = createAsyncThunk<
void,
ReviewPost,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.SendReview,
  async (userReview, {extra: api}) => {
    await api.post<ReviewsRaw>(ApiRoute.Reviews, userReview);
  }
);
