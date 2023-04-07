export type Order = Coupon & {
  camerasIds: number[];
};

export type Coupon = {
  coupon: null | string;
};

export type CouponResponse = null | number;
