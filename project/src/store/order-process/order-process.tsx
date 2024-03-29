import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { sendCouponAction, sendOrderAction } from '../api-actions/api-actions';

import { NameSpace } from '../../const/name-space';
import { FetchStatus } from '../../const/fetch-status';

import { OrderData, SeveralCameras } from '../../@types/store-types';
import { Camera, Cameras } from '../../@types/camera-types';

export const initialStateOrder: OrderData = {
  camerasInBasket: [],
  newCamerasInBasket: null,
  selectedCamera: null,
  orderSendingStatus: FetchStatus.Default,
  discount: null,
  coupon: '',
  couponSendingStatus: FetchStatus.Default
};

export const orderProcess = createSlice({
  name: NameSpace.Order,
  initialState: initialStateOrder,
  reducers: {
    addCameraToBasket: (state, action: PayloadAction<Camera>) => {
      const selectedCamera = action.payload;
      state.camerasInBasket = [...state.camerasInBasket, selectedCamera].slice().sort((itemA, itemB) => itemA.id - itemB.id);
    },
    removeSameCamerasFromBasket: (state, action: PayloadAction<number>) => {
      state.camerasInBasket = state.camerasInBasket.filter((camera) => camera.id !== action.payload);
    },
    addSameCamerasToBasket: (state, action: PayloadAction<SeveralCameras>) => {
      const {camera, camerasAmount} = action.payload;
      const newCameras = new Array(Number(camerasAmount)).fill(camera) as Cameras;

      const addedCameraFirstIndex = state.camerasInBasket.findIndex((item) => item.id === camera.id);
      const sameCamerasInBasketAmount = state.camerasInBasket.filter((item) => item.id === camera.id).length;
      const addedCameraLastIndex = addedCameraFirstIndex + sameCamerasInBasketAmount - 1;

      state.camerasInBasket = [...state.camerasInBasket.slice(0, addedCameraFirstIndex), ...newCameras, ...state.camerasInBasket.slice(addedCameraLastIndex + 1)];
    },
    removeCameraFromBasket: (state, action: PayloadAction<number>) => {
      const removedCameraIndex = state.camerasInBasket.findIndex((camera) => camera.id === action.payload);
      state.camerasInBasket = [...state.camerasInBasket.slice(0, removedCameraIndex), ...state.camerasInBasket.slice(removedCameraIndex + 1)];
    },
    selectCamera: (state, action: PayloadAction<Camera|null>) => {
      state.selectedCamera = action.payload;
    },
    addCoupon: (state, action: PayloadAction<string>) => {
      state.coupon = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendOrderAction.fulfilled, (state) => {
        state.orderSendingStatus = FetchStatus.Success;
        state.camerasInBasket = [];
        state.discount = null;
        state.coupon = '';
        state.couponSendingStatus = FetchStatus.Default;
        state.selectedCamera = null;
      })
      .addCase(sendOrderAction.pending, (state) => {
        state.orderSendingStatus = FetchStatus.Loading;
      })
      .addCase(sendOrderAction.rejected, (state) => {
        state.orderSendingStatus = FetchStatus.Error;
      })
      .addCase(sendCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.couponSendingStatus = FetchStatus.Success;
      })
      .addCase(sendCouponAction.pending, (state) => {
        state.couponSendingStatus = FetchStatus.Loading;
      })
      .addCase(sendCouponAction.rejected, (state) => {
        state.couponSendingStatus = FetchStatus.Error;
      });
  }
});

export const { addCameraToBasket, removeCameraFromBasket, removeSameCamerasFromBasket, selectCamera, addSameCamerasToBasket, addCoupon } = orderProcess.actions;

