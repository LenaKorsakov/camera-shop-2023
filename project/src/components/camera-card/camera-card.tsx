import { useState } from 'react';
import { Link } from 'react-router-dom';

import InBasketLink from './in-basket-link';
import CameraRating from '../camera-rating/camera-rating';
import Picture from '../picture/picture';

import { AppRoute } from '../../const/app-route';
import { capitalizeFirstLetter, formatPrice } from '../../utiles/format';
import { PictureSize } from '../../const/picture-size';
import { ComponentName } from '../../const/component-name';
import { DEFAULT_TABS_TYPE } from '../../const/tabs-buttons';

import { Camera } from '../../@types/camera-types';

type CameraCardProps = {
isActive: boolean;
camera: Camera;
}

function CameraCard({isActive, camera}: CameraCardProps): JSX.Element {
  const {id, name, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount, category } = camera;
  const [inBasket, setInBasket] = useState<boolean>(false);

  const handleButtonClick = () => {
    //появляется попап с кнопкой добавить товар в корзину
    //по клику на кнопку диспатчим отправку заказа
    // если все ок перенаправляем в корзину и  показать попап спасибо и далее
    setInBasket(true);//это тоже будет устанавливаться и забираться из глобального state пока так
  };

  return (
    <div
      className={`product-card ${isActive ? 'is-active' : ''}`}
    >
      <div className="product-card__img">
        <Picture
          previewImg={previewImg}
          previewImgWebp={previewImgWebp}
          previewImgWebp2x={previewImgWebp2x}
          previewImg2x={previewImg2x}
          name={name}
          size={PictureSize.PREVIEW_PICTURE}
        />
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <CameraRating
            rating={rating}
            reviewCount={reviewCount}
          />
        </div>
        <p className="product-card__title">
          {`${capitalizeFirstLetter(category)} «${capitalizeFirstLetter(name)}»`}
        </p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">

        { inBasket ? <InBasketLink/> :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleButtonClick}
          >
                      Купить
          </button>}

        <Link
          className="btn btn--transparent"
          to={`${AppRoute.Product}/${id}?${ComponentName.Tab}=${DEFAULT_TABS_TYPE}`}
        >
                      Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CameraCard;
