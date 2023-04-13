import { FormEvent, useEffect, useState } from 'react';

import BasketOrder from './basket-order/basket-order';
import BasketCoupon from './basket-promo/basket-promo';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasInTheBasket, getCoupon, getCouponSendingStatus } from '../../store/order-process/order-process-selectors';
import { sendCouponAction, sendOrderAction } from '../../store/api-actions/api-actions';

import { FetchStatus } from '../../const/fetch-status';
import { CouponValidityStatus } from '../../const/coupon-validity-status';

import { Camera } from '../../@types/camera-types';

type BasketSummaryProps = {
  onModalSuccessOpen: () => void;
};

function BasketSummary({ onModalSuccessOpen }: BasketSummaryProps): JSX.Element {
  const dispatch = useAppDispatch();

  const promoCode = useAppSelector(getCoupon);
  const couponSendingStatus = useAppSelector(getCouponSendingStatus);
  const camerasInBasket = useAppSelector(getCamerasInTheBasket);

  const isBasketEmpty = camerasInBasket.length === 0;
  const camerasIds = camerasInBasket.map((camera) => camera.id);
  const camerasInBasketTotalPrice = camerasInBasket.reduce((acc: number, item: Camera) => acc + item.price, 0);
  const discount = promoCode ? Math.ceil(camerasInBasketTotalPrice / 100 * promoCode) : 0;

  const [coupon, setCoupon] = useState<string>('');
  const [couponValidityStatus, setCouponValidityStatus] = useState<CouponValidityStatus>(CouponValidityStatus.Default);

  const handleCouponInputChange = (value: string) => {
    setCoupon(value);
  };

  const handlePromoFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validCoupon = coupon.split(' ').join('');
    dispatch(sendCouponAction({coupon: validCoupon}));
  };

  const handleOrderButtonClick = () => {
    const validCoupon = couponValidityStatus === CouponValidityStatus.Valid ? coupon.split(' ').join('') : null;

    dispatch(sendOrderAction({coupon: validCoupon, camerasIds: camerasIds })).unwrap().then(() => {
      onModalSuccessOpen();
      setCouponValidityStatus(CouponValidityStatus.Default);
      setCoupon('');
    });
  };

  useEffect(() => {
    if (couponSendingStatus === FetchStatus.Success) {
      if (promoCode === null) {
        setCouponValidityStatus(CouponValidityStatus.NotValid);
      } else {
        setCouponValidityStatus(CouponValidityStatus.Valid);
      }
    }

    if (couponSendingStatus === FetchStatus.Error) {
      setCouponValidityStatus(CouponValidityStatus.Error);
    }
  },[promoCode, couponSendingStatus]);

  return (
    <div className="basket__summary">
      <BasketCoupon
        coupon={coupon}
        onCouponInputChange={handleCouponInputChange}
        couponValidityStatus={couponValidityStatus}
        onCouponFormSubmit={handlePromoFormSubmit}
        isBasketEmpty={isBasketEmpty}
      />
      <BasketOrder
        discount={discount}
        totalPrice={camerasInBasketTotalPrice}
        isBasketEmpty={isBasketEmpty}
        onOrderButtonClick={handleOrderButtonClick}
      />
    </div>
  );


}

export default BasketSummary;
