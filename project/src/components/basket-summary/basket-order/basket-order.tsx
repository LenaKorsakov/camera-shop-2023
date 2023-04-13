import {memo } from 'react';

import { useAppSelector } from '../../../hooks';
import { getOrderSendingStatus } from '../../../store/order-process/order-process-selectors';
import { formatPrice } from '../../../utils/format';

import { FetchStatus } from '../../../const/fetch-status';
import { OrderButtonTitle } from '../../../const/order-button-title';

type BasketOrderProps = {
  discount: number;
  totalPrice: number;
  isBasketEmpty: boolean;
  onOrderButtonClick: () => void;
}

function BasketOrder({discount, totalPrice, isBasketEmpty, onOrderButtonClick}: BasketOrderProps): JSX.Element {
  const totalPriceWithDiscount = totalPrice - discount;
  const orderStatus = useAppSelector(getOrderSendingStatus);

  const handleOrderButtonClick = () => {
    onOrderButtonClick();
  };

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{formatPrice(totalPrice)} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className="basket__summary-value basket__summary-value--bonus">
          {formatPrice(discount)} ₽
        </span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">
  К оплате:
        </span>
        <span className="basket__summary-value basket__summary-value--total">
          {formatPrice(totalPriceWithDiscount)} ₽
        </span>
      </p>
      <button
        className="btn btn--purple"
        type="submit"
        disabled={isBasketEmpty}
        onClick={handleOrderButtonClick}
      >
        {orderStatus === FetchStatus.Loading ? OrderButtonTitle.Sending : OrderButtonTitle.Default}
      </button>
    </div>
  );
}

export default memo(BasketOrder);
