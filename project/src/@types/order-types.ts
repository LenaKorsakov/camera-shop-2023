import { Camera } from './camera-types';

export type Order = Coupon & {
  camerasIds: number[];
};

export type Coupon = {
  coupon: null | string;
};

export type CouponResponse = null | number;

export type CamerasInTheBasket = {
  id: {
    camera: Camera;
    amount: number;
  };
}
