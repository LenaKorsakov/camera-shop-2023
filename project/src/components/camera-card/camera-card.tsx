import { Link } from 'react-router-dom';

import InBasketLink from './in-basket-link';
import CameraRating from '../camera-rating/camera-rating';
import Picture from '../picture/picture';

import { AppRoute } from '../../const/app-route';
import { capitalizeFirstLetter, formatPrice } from '../../utils/format';
import { PictureSize } from '../../const/picture-size';
import { ComponentName } from '../../const/component-name';
import { DEFAULT_TABS_TYPE } from '../../const/tabs-buttons';

import { Camera } from '../../@types/camera-types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasInTheBasket } from '../../store/order-process/order-process-selectors';
import { selectCamera } from '../../store/order-process/order-process';

type CameraCardProps = {
isActive: boolean;
camera: Camera;
onAddCameraInBasketButtonClick: () => void;
}

function CameraCard({isActive, camera, onAddCameraInBasketButtonClick}: CameraCardProps): JSX.Element {
  const {id, name, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount, category } = camera;

  const dispatch = useAppDispatch();

  const camerasInTheBasket = useAppSelector(getCamerasInTheBasket);
  const isAlreadyInTheBasket = camerasInTheBasket.some((item) => item.id === id);

  const handleAddCameraInBasketButtonClick = () => {
    dispatch(selectCamera(camera));
    onAddCameraInBasketButtonClick();
  };

  return (
    <div
      className={`product-card ${isActive ? 'is-active' : ''}`} data-testid ="card"
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

        { isAlreadyInTheBasket ? <InBasketLink/> :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleAddCameraInBasketButtonClick}
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
