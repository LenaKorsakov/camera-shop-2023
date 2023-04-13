import { FormEvent, useEffect, useState } from 'react';

import BasketOrder from './basket-order/basket-order';
import BasketCoupon from './basket-promo/basket-promo';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasInTheBasket, getCoupon, getCouponSendingStatus } from '../../store/order-process/order-process-selectors';
import { sendCouponAction } from '../../store/api-actions/api-actions';

import { FetchStatus } from '../../const/fetch-status';
import { CouponValidityStatus } from '../../const/coupon-validity-status';

function BasketSummary(): JSX.Element {
  const dispatch = useAppDispatch();

  const promoCode = useAppSelector(getCoupon);
  const couponSendingStatus = useAppSelector(getCouponSendingStatus);
  const camerasInBasket = useAppSelector(getCamerasInTheBasket);

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
        isBasketEmpty={camerasInBasket.length === 0}
      />
      <BasketOrder/>
    </div>
  );


}

export default BasketSummary;
