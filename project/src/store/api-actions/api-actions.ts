import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Action } from '../../const/action';
import { ApiRoute } from '../../const/api-route';
import { QueryKey } from '../../const/query-key';
import { FilterCategory, ServerFilterValue } from '../../const/filter-category';
import { ServerTypeValue } from '../../const/sort-type';

import { ReviewPost, ReviewsRaw } from '../../@types/review-types';
import { Camera, Cameras, Promo } from '../../@types/camera-types';
import { AppDispatch, State, UserInput } from '../../@types/store-types';

const generateCamerasSearchParams = (state: State) => {
  const categoryParams = state.FILTER.currentFilterCategory === FilterCategory.Photocamera
    ? ServerFilterValue.Photocamera
    : state.FILTER.currentFilterCategory;

  const makePrice = (price: UserInput) => price === '' ? null : price;

  return({
    [QueryKey.SortOrder]: state.SORT.currentSortOrder,
    [QueryKey.SortType]: state.SORT.currentSortType,
    [QueryKey.FilterLevel]: state.FILTER.currentFilterLevels,
    [QueryKey.FilterType]: state.FILTER.currentFilterTypes,
    [QueryKey.FilterCategory]: categoryParams,
    [QueryKey.PriceFrom]: makePrice(state.FILTER.bottomPrice),
    [QueryKey.PriceTo]: makePrice(state.FILTER.topPrice)
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

export const fetchPricesAction = createAsyncThunk<
{minPrice: number; maxPrice: number},
undefined,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(Action.FetchPrices,
  async (_arg, {getState, extra: api}) => {
    const state = getState();
    const params = generateCamerasSearchParams(state);

    const priceSearchParams = {
      ...params,
      [QueryKey.SortType]: ServerTypeValue.Price,
    };

    const { data } = await api.get<Cameras>(ApiRoute.Cameras, {params: priceSearchParams});
    const mostExpensiveCameraIndex = data.length - 1;

    const minPrice = data[0].price;
    const maxPrice = data[mostExpensiveCameraIndex].price;


    return {minPrice, maxPrice};
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
