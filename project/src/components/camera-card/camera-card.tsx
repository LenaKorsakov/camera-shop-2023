import { Link } from 'react-router-dom';
import { useState } from 'react';

import StarsRating from '../stars-rating/stars-rating';
import InBasketButton from './in-basket-button';
import Picture from '../picture/picture';

import { AppRoute } from '../../const/app-route';
import { capitalizeFirstLetter, formatPrice } from '../../utiles/format';
import { PictureSize } from '../../const/picture-size';

import { Camera } from '../../@types/camera-types';

type CameraCardProps = {
isActive: boolean;
camera: Camera;
}

function CameraCard({isActive, camera}: CameraCardProps): JSX.Element {
  const {id, name, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount } = camera;
  const [inBasket, setInBasket] = useState<boolean>(false);

  const handleButtonClick = () => {
    //появляется попап с кнопкой добавить товар в корзину
    //по клику на кнопку диспатчим отправку заказа
    // если все ок перенаправляем в корзину и  показать попап спасибо и далее
    setInBasket(true);
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
          <StarsRating
            rating={rating}
          />
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {`«${capitalizeFirstLetter(name)}»`}
        </p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">

        { inBasket ? <InBasketButton/> :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleButtonClick}
          >
                      Купить
          </button>}

        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>
                      Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CameraCard;
