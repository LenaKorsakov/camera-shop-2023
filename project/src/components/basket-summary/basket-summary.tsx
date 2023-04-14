import { FormEvent, useEffect, useState } from 'react';

import BasketOrder from './basket-order/basket-order';
import BasketCoupon from './basket-promo/basket-promo';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasInTheBasket, getDiscount, getCouponSendingStatus, getCoupon } from '../../store/order-process/order-process-selectors';
import { sendCouponAction, sendOrderAction } from '../../store/api-actions/api-actions';

import { FetchStatus } from '../../const/fetch-status';
import { CouponValidityStatus } from '../../const/coupon-validity-status';

import { Camera } from '../../@types/camera-types';
import { addCoupon } from '../../store/order-process/order-process';

type BasketSummaryProps = {
  onModalSuccessOpen: () => void;
};

function BasketSummary({ onModalSuccessOpen }: BasketSummaryProps): JSX.Element {
  const dispatch = useAppDispatch();

  const discount = useAppSelector(getDiscount);
  const couponSendingStatus = useAppSelector(getCouponSendingStatus);
  const camerasInBasket = useAppSelector(getCamerasInTheBasket);
  const initialCoupon = useAppSelector(getCoupon);

  const isBasketEmpty = camerasInBasket.length === 0;
  const camerasIds = camerasInBasket.map((camera) => camera.id);
  const camerasInBasketTotalPrice = camerasInBasket.reduce((acc: number, item: Camera) => acc + item.price, 0);
  const discountPrice = discount ? Math.ceil(camerasInBasketTotalPrice / 100 * discount) : 0;

  const [coupon, setCoupon] = useState<string>(initialCoupon);
  const [couponValidityStatus, setCouponValidityStatus] = useState<CouponValidityStatus>(CouponValidityStatus.Default);

  const handleCouponInputChange = (value: string) => {
    if (value === '') {
      setCouponValidityStatus(CouponValidityStatus.Default);
    }
    setCoupon(value);
  };

  const handlePromoFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validCoupon = coupon.split(' ').join('');
    dispatch(sendCouponAction({coupon: validCoupon}));
    dispatch(addCoupon(coupon));
  };

  const handleOrderButtonClick = () => {
    const validCoupon = couponValidityStatus === CouponValidityStatus.Valid ? coupon.split(' ').join('') : null;

    dispatch(sendOrderAction({coupon: validCoupon, camerasIds: camerasIds })).unwrap().then(
      () => {
        onModalSuccessOpen();
        setCouponValidityStatus(CouponValidityStatus.Default);
        setCoupon('');
      },
      () => {
        onModalSuccessOpen();
      });
  };

  useEffect(() => {
    if (couponSendingStatus === FetchStatus.Success) {
      if (discount === null) {
        setCouponValidityStatus(CouponValidityStatus.NotValid);
      } else {
        setCouponValidityStatus(CouponValidityStatus.Valid);
      }
    }
    if (couponSendingStatus === FetchStatus.Error) {
      setCouponValidityStatus(CouponValidityStatus.Error);
    }
  },[discount, couponSendingStatus]);

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
        discountPrice={discountPrice}
        totalPrice={camerasInBasketTotalPrice}
        isBasketEmpty={isBasketEmpty}
        onOrderButtonClick={handleOrderButtonClick}
      />
    </div>
  );


}

export default BasketSummary;
