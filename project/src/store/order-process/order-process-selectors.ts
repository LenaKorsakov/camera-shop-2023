import { NameSpace } from '../../const/name-space';

import { State } from '../../@types/store-types';
import { FetchStatus } from '../../const/fetch-status';
import { CouponResponse } from '../../@types/order-types';
import { Camera, Cameras } from '../../@types/camera-types';

export const getOrderSendingStatus = (state: State): FetchStatus => state[NameSpace.Order].orderSendingStatus;
export const getCouponSendingStatus = (state: State): FetchStatus => state[NameSpace.Order].couponSendingStatus;

export const getSelectedCamera = (state: State): Camera | null => state[NameSpace.Order].selectedCamera;

export const getCoupon = (state: State): CouponResponse => state[NameSpace.Order].coupon;
export const getCamerasInTheBasket = (state: State): Cameras => state[NameSpace.Order].camerasInBasket;
