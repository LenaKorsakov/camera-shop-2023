import { ChangeEvent, KeyboardEvent } from 'react';

import { useAppDispatch } from '../../hooks';
import { addCameraToBasket, addSeveralCamerasToBasket, removeCameraFromBasket } from '../../store/order-process/order-process';
import { displayError } from '../../store/actions';

import { ProductAmount } from '../../const/const';
import { WarningMessage } from '../../const/warning-message';

import { Camera } from '../../@types/camera-types';

type BasketQuantityProps = {
  onCameraAmountChange: (quantity: number|string) => void;
  camera: Camera;
  camerasAmount: number|string;
}

function BasketItemAmount({onCameraAmountChange, camera, camerasAmount}: BasketQuantityProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isAmountMinimum = Number(camerasAmount) === ProductAmount.Min;
  const isAmountMaximum = Number(camerasAmount) === ProductAmount.Max;

  const addExtraCameraToBasket = () => {
    dispatch(addCameraToBasket(camera));
  };

  const handleCameraAmountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentProductAmount = Number(event.target.value);

    if (currentProductAmount === 0) {
      onCameraAmountChange('');

      return;
    }

    onCameraAmountChange(currentProductAmount);
  };

  const handleCameraAmountInputBlur = () => {
    if (Number(camerasAmount) < ProductAmount.Min) {
      dispatch(displayError(WarningMessage.ProductsAmountLessThanMinimum));
      onCameraAmountChange(ProductAmount.Min);

      addExtraCameraToBasket();

      return;
    }
    if (Number(camerasAmount) > ProductAmount.Max) {
      dispatch(displayError(WarningMessage.ProductsAmountMoreThanMaximum));
      onCameraAmountChange(ProductAmount.Max);

      dispatch(addSeveralCamerasToBasket({camera, camerasAmount: ProductAmount.Max}));

      return;
    }

    dispatch(addSeveralCamerasToBasket({camera, camerasAmount}));
  };

  const handleCameraDecreaseAmountButton = () => {
    onCameraAmountChange(Number(camerasAmount) - 1);

    dispatch(removeCameraFromBasket(camera.id));
  };

  const handleCameraIncreaseAmountButton = () => {
    onCameraAmountChange(Number(camerasAmount) + 1);

    addExtraCameraToBasket();
  };

  const handlePriceInputBlur = (event: KeyboardEvent) => {
    const inputElement = event.target as HTMLInputElement;
    if (event.key.startsWith('Ent')) {
      inputElement.blur();
    }
  };

  return (
    <div className="quantity">
      <button
        className="btn-icon btn-icon--prev"
        disabled={isAmountMinimum}
        onClick={handleCameraDecreaseAmountButton}
        aria-label="уменьшить количество товара"
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <label className="visually-hidden" htmlFor="counter2" />
      <input
        type="number"
        id="counter2"
        value={camerasAmount}
        onChange={handleCameraAmountInputChange}
        onBlur={handleCameraAmountInputBlur}
        onKeyDown={handlePriceInputBlur}
        aria-label="количество товара"
      />
      <button
        className="btn-icon btn-icon--next"
        disabled={isAmountMaximum}
        onClick={handleCameraIncreaseAmountButton}
        aria-label="увеличить количество товара"
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
  );
}

export default BasketItemAmount;
