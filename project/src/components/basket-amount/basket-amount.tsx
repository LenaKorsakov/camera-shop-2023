import { Camera } from '../../@types/camera-types';

type BasketQuantityProps = {
  onProductQuantityChange: (quantity: number) => void;
  camera: Camera;
}

function BasketQuantity({onProductQuantityChange, camera}: BasketQuantityProps): JSX.Element {
  return (
    <div className="quantity">
      <button
        className="btn-icon btn-icon--prev"
        disabled
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
        defaultValue={1}
        min={1}
        max={99}
        aria-label="количество товара"
      />
      <button
        className="btn-icon btn-icon--next"
        aria-label="увеличить количество товара"
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
  );
}

export default BasketQuantity;
