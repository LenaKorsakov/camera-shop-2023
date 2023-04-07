import Picture from '../picture/picture';

import { PictureSize } from '../../const/picture-size';
import { capitalizeFirstLetter, formatPrice } from '../../utils/format';

import { Camera } from '../../@types/camera-types';
import { PhotocameraCategoryName } from '../../const/const';
import { ModalType } from '../../const/modal-type';

type BasketItemShortProps = {
  camera: Camera;
  modalType: ModalType;
}

function BasketItemShort({camera, modalType} : BasketItemShortProps): JSX.Element {
  const { previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, type, vendorCode, category, level, price } = camera;

  const getCategory = (cameraCategory: string) => {
    if (cameraCategory === PhotocameraCategoryName.Photocamera) {
      return PhotocameraCategoryName.ModalPhotocamera;
    }

    return cameraCategory;
  };

  return (
    <div className="basket-item basket-item--short">
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
            {`${capitalizeFirstLetter(type)} ${getCategory(category).toLowerCase()}`}
          </li>
          <li className="basket-item__list-item">{`${capitalizeFirstLetter(level)} уровень`}</li>
        </ul>
        {modalType === ModalType.AddCameraInBasket &&
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
      </p>}
      </div>
    </div>
  );
}

export default BasketItemShort;
