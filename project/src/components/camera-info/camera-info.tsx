import { memo } from 'react';

import Tabs from '../tabs.tsx/tabs';
import Picture from '../picture/picture';
import CameraRating from '../camera-rating/camera-rating';

import { useAppDispatch } from '../../hooks';

import { PictureSize } from '../../const/picture-size';
import { capitalizeFirstLetter, formatPrice } from '../../utils/format';

import { Camera } from '../../@types/camera-types';
import { selectCamera } from '../../store/order-process/order-process';

type CameraInfoProps = {
  camera: Camera;
  onAddToBasketButtonClick: () => void;
}

function CameraInfo({camera, onAddToBasketButtonClick}: CameraInfoProps): JSX.Element {
  const { name, reviewCount, rating, price, previewImg, previewImgWebp, previewImg2x, previewImgWebp2x, category } = camera;
  const dispatch = useAppDispatch();

  const handleAddToBasketButtonClick = () => {
    dispatch(selectCamera(camera));
    onAddToBasketButtonClick();
  };

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <Picture
            name={name}
            previewImg={previewImg}
            previewImg2x={previewImg2x}
            previewImgWebp={previewImgWebp}
            previewImgWebp2x={previewImgWebp2x}
            size = {PictureSize.PRODUCT_PICTURE}
          />
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{`${capitalizeFirstLetter(category)} «${capitalizeFirstLetter(name)}»`}</h1>
          <div className="rate product__rate">
            <CameraRating
              rating={rating}
              reviewCount={reviewCount}
            />
          </div>
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
          </p>
          <button
            className="btn btn--purple"
            type="button"
            onClick={handleAddToBasketButtonClick}
          >
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
                Добавить в корзину
          </button>
          <Tabs camera={camera}/>
        </div>
      </div>
    </section>
  );
}

export default memo(CameraInfo);
