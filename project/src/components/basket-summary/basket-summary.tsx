import { FormEvent, useState } from 'react';

import BasketOrder from './basket-order/basket-order';
import BasketCoupon from './basket-promo/basket-promo';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasInTheBasket, getCoupon, getCouponSendingStatus } from '../../store/order-process/order-process-selectors';
import { sendCouponAction } from '../../store/api-actions/api-actions';

import { FetchStatus } from '../../const/fetch-status';

function BasketSummary(): JSX.Element {
  const dispatch = useAppDispatch();

  const promoCode = useAppSelector(getCoupon);
  const couponSendingStatus = useAppSelector(getCouponSendingStatus);
  const camerasInBasket = useAppSelector(getCamerasInTheBasket);

  const isPromoCodeNotExist = couponSendingStatus === FetchStatus.Success && promoCode === null;
  const isPromoCodeSendError = couponSendingStatus === FetchStatus.Error;

  const [coupon, setCoupon] = useState<string>('');

  const handleCouponInputChange = (value: string) => {
    setCoupon(value.split(' ').join(''));
  };

  const handlePromoFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(sendCouponAction({coupon: coupon}));
  };

  return (
    <div className="basket__summary">
      <BasketCoupon
        coupon={coupon}
        onCouponInputChange={handleCouponInputChange}
        isCouponNotExist={isPromoCodeNotExist}
        isCouponSendError={isPromoCodeSendError}
        onCouponFormSubmit={handlePromoFormSubmit}
        isBasketEmpty={camerasInBasket.length === 0}
      />
      <BasketOrder/>
    </div>
  );


}

export default BasketSummary;
