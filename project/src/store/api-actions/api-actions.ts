import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Action } from '../../const/action';
import { ApiRoute } from '../../const/api-route';
import { QueryKey } from '../../const/query-key';
import { FilterByCategory, ServerFilterValue } from '../../const/filter-by-category';
import { SortByTypeServerValue } from '../../const/sort-by-type';

import { ReviewPost, ReviewsRaw } from '../../@types/review-types';
import { Camera, Cameras, Promo } from '../../@types/camera-types';
import { AppDispatch, State, UserInput } from '../../@types/store-types';
import { SortByOrderServerValue } from '../../const/sort-by-order';

const generateCamerasSearchParams = (state: State, isFetchingMinPrice?: boolean, isFetchingMaxPrice?: boolean) => {
  const CAMERA_LIMIT = 1;
  const categoryParams = state.FILTER.currentFilterCategory === FilterByCategory.Photocamera
    ? ServerFilterValue.Photocamera
    : state.FILTER.currentFilterCategory;

  const makePrice = (price: UserInput) => price === '' ? null : price;

  const filtersParams = {
    [QueryKey.FilterLevel]: state.FILTER.currentFilterLevels,
    [QueryKey.FilterType]: state.FILTER.currentFilterTypes,
    [QueryKey.FilterCategory]: categoryParams,
    [QueryKey.BottomPrice]: makePrice(state.FILTER.bottomPrice),
    [QueryKey.TopPrice]: makePrice(state.FILTER.topPrice)
  };

  if (isFetchingMinPrice) {
    return({
      ...filtersParams,
      [QueryKey.SortType]: SortByTypeServerValue.Price,
      [QueryKey.Limit]: CAMERA_LIMIT,
    });
  }
  if (isFetchingMaxPrice) {
    return({
      ...filtersParams,
      [QueryKey.SortOrder]: SortByOrderServerValue.OrderDown,
      [QueryKey.SortType]: SortByTypeServerValue.Price,
      [QueryKey.Limit]: CAMERA_LIMIT,
    });
  }

  return({
    ...filtersParams,
    [QueryKey.SortOrder]: state.SORT.currentSortOrder,
    [QueryKey.SortType]: state.SORT.currentSortType,
  });
};

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
    const params = generateCamerasSearchParams(state);

    const { data } = await api.get<Cameras>(ApiRoute.Cameras, {params});

    return data;
  }
);

export const fetchMinPriceAction = createAsyncThunk<
number,
undefined,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.FetchMinPrice,
  async (_arg, {getState, extra: api}) => {
    const state = getState();
    const params = generateCamerasSearchParams(state, true);

    const { data } = await api.get<Cameras>(ApiRoute.Cameras, {params});

    const minPrice = data[0].price;

    return minPrice;
  }
);

export const fetchMaxPriceAction = createAsyncThunk<
number,
undefined,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.FetchMaxPrice,
  async (_arg, {getState, extra: api}) => {
    const state = getState();
    const params = generateCamerasSearchParams(state, false, true);

    const { data } = await api.get<Cameras>(ApiRoute.Cameras, {params});

    const maxPrice = data[0].price;

    return maxPrice;
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
    const params = {[QueryKey.Search]: value};

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
