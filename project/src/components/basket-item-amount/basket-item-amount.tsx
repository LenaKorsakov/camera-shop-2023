import { ChangeEvent } from 'react';
import { Camera } from '../../@types/camera-types';
import { ProductAmount } from '../../const/const';
import { useAppDispatch } from '../../hooks';
import { addCameraToBasket, addSeveralCameraToBasket, removeCameraFromBasket } from '../../store/order-process/order-process';

type BasketQuantityProps = {
  onCameraAmountChange: (quantity: number|string) => void;
  camera: Camera;
  camerasAmount: number|string;
}

function BasketItemAmount({onCameraAmountChange, camera, camerasAmount}: BasketQuantityProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isAmountMinimum = Number(camerasAmount) <= ProductAmount.Min;
  const isAmountMaximum = Number(camerasAmount) >= ProductAmount.Max;

  const addExtraCameraToBasket = () => {
    dispatch(addCameraToBasket(camera));
  };

  const handleCameraAmountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentProductAmount = Number(event.target.value);

    if (currentProductAmount === 0) {
      onCameraAmountChange('');
    }

    onCameraAmountChange(currentProductAmount);
  };

  const handleCameraAmountInputBlur = () => {
    if (isAmountMinimum) {
      onCameraAmountChange(ProductAmount.Min);
      dispatch(addSeveralCameraToBasket({camera, camerasAmount: ProductAmount.Min}));

      return;
    }
    if (isAmountMaximum) {
      onCameraAmountChange(ProductAmount.Max);
      dispatch(addSeveralCameraToBasket({camera, camerasAmount: ProductAmount.Max}));

      return;
    }

    onCameraAmountChange(camerasAmount);
    dispatch(addSeveralCameraToBasket({camera, camerasAmount}));
  };

  const handleCameraDecreaseAmountButton = () => {
    onCameraAmountChange(Number(camerasAmount) - 1);

    dispatch(removeCameraFromBasket(camera.id));
    //почему удаляет другую камеру
  };

  const handleCameraIncreaseAmountButton = () => {
    onCameraAmountChange(Number(camerasAmount) + 1);

    addExtraCameraToBasket();
  };

  return (
    <div className="quantity">
      <button
        className="btn-icon btn-icon--prev"
        disabled={isAmountMinimum}
        onClick={handleCameraDecreaseAmountButton}
        onBlur={handleCameraAmountInputBlur}
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
