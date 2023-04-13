import { ChangeEvent, FormEvent } from 'react';
import { WarningMessage } from '../../../const/warning-message';

type BasketCouponProps = {
  isCouponNotExist: boolean;
  isCouponSendError: boolean;
  coupon: string;
  onCouponInputChange: (value: string) => void;
  onCouponFormSubmit: (event: FormEvent) => void;
  isBasketEmpty: boolean;
}

function BasketCoupon({isCouponNotExist, coupon, onCouponInputChange, isCouponSendError, onCouponFormSubmit, isBasketEmpty}: BasketCouponProps): JSX.Element {
  const handleCouponInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCouponInputChange(event.target.value);
  };

  return (
    <div className="basket__promo">
      <p className="title title--h4">
Если у вас есть промокод на скидку, примените его в этом поле
      </p>
      <div className="basket-form">
        <form action="#" onSubmit={onCouponFormSubmit}>
          <div className={`custom-input form-review__item ${isCouponNotExist || isCouponSendError ? 'is-invalid' : 'is-valid'}`}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                type="text"
                name="promo"
                placeholder="Введите промокод"
                value={coupon}
                onChange={handleCouponInputChange}
              />
            </label>
            <p className="custom-input__error">{(isCouponNotExist && WarningMessage.PromoCodeDoesNotExist) || (isCouponSendError && WarningMessage.PromoCodeSendingError)}</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit" disabled={isBasketEmpty}>
    Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default BasketCoupon;
