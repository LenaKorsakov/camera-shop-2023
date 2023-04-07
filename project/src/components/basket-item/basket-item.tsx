import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCamerasInTheBasket } from '../../store/order-process/order-process-selectors';

import Picture from '../picture/picture';
import BasketAmount from '../basket-amount/basket-amount';

import { PictureSize } from '../../const/picture-size';
import { capitalizeFirstLetter, formatPrice } from '../../utils/format';

import { Camera } from '../../@types/camera-types';

type BasketItemProps = {
  camera: Camera;
  onRemoveCameraFromBasketButtonClick: (id: number) => void;
}

function BasketItem({ camera, onRemoveCameraFromBasketButtonClick } : BasketItemProps): JSX.Element {
  const { previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, type, vendorCode, category, level, price, id} = camera;

  const selectedCameras = useAppSelector(getCamerasInTheBasket);
  const sameCameras = selectedCameras.filter((item) => item.id === id);
  const sameCamerasAmount = sameCameras.length;

  const [camerasAmount, setCamerasAmount] = useState<number>(sameCamerasAmount);

  const totalPrice = formatPrice(camerasAmount * price);

  const handleProductAmountChange = (productAmount: number) => {
    setCamerasAmount(productAmount);
  };

  const handleRemoveCameraFromBasketButtonClick = () => {
    onRemoveCameraFromBasketButtonClick(camera.id);
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <Picture
          previewImg={previewImg}
          previewImgWebp={previewImgWebp}
          previewImgWebp2x={previewImgWebp2x}
          previewImg2x={previewImg2x}
          name={name}
          size={PictureSize.BASKET_PICTURE}
        />
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{`${capitalizeFirstLetter(category)} «${capitalizeFirstLetter(name)}»`}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">
            {type}
          </li>
          <li className="basket-item__list-item">{level}</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
      </p>
      <BasketAmount
        onProductQuantityChange={handleProductAmountChange}
        camera={camera}
      />
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{totalPrice} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleRemoveCameraFromBasketButtonClick}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
