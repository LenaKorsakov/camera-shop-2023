import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { sendCouponAction, sendOrderAction } from '../api-actions/api-actions';

import { NameSpace } from '../../const/name-space';
import { FetchStatus } from '../../const/fetch-status';

import { OrderData, SeveralCameras } from '../../@types/store-types';
import { Camera, Cameras } from '../../@types/camera-types';

export const initialStateOrder: OrderData = {
  camerasInBasket: [],
  selectedCamera: null,
  orderSendingStatus: FetchStatus.Default,
  coupon: null,
  couponSendingStatus: FetchStatus.Default
};

export const orderProcess = createSlice({
  name: NameSpace.Order,
  initialState: initialStateOrder,
  reducers: {
    addCameraToBasket: (state, action: PayloadAction<Camera>) => {
      const selectedCamera = action.payload;

      state.camerasInBasket = [...state.camerasInBasket, selectedCamera];
    },
    removeSameCamerasFromBasket: (state, action: PayloadAction<number>) => {
      state.camerasInBasket = state.camerasInBasket.filter((camera) => camera.id !== action.payload);
    },
    addSeveralCameraToBasket: (state, action: PayloadAction<SeveralCameras>) => {
      const {camera, camerasAmount} = action.payload;
      const newCameras = new Array(Number(camerasAmount)).fill(camera) as Cameras;

      state.camerasInBasket = [...state.camerasInBasket, ...newCameras];
    },
    removeCameraFromBasket: (state, action: PayloadAction<number>) => {
      const cameraIndex = state.camerasInBasket.findIndex((camera) => camera.id === action.payload);

      state.camerasInBasket = [...state.camerasInBasket.splice(cameraIndex, 1)];
    },
    selectCamera: (state, action: PayloadAction<Camera>) => {
      state.selectedCamera = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendOrderAction.fulfilled, (state) => {
        state.orderSendingStatus = FetchStatus.Success;
        state.camerasInBasket = [];
        state.coupon = null;
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
        state.coupon = action.payload;
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

export const {addCameraToBasket, removeCameraFromBasket, removeSameCamerasFromBasket, selectCamera, addSeveralCameraToBasket} = orderProcess.actions;

