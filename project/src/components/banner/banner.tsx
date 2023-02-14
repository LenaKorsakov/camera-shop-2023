import { Link } from 'react-router-dom';

import Picture from '../picture/picture';

import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/catalog-process/catalog-process-selectors';

import { AppRoute } from '../../const/app-route';
import { PictureSize } from '../../const/picture-size';

function Bunner(): JSX.Element {
  const promoCamera = useAppSelector(getPromo);
  const { name, previewImg, previewImgWebp, previewImg2x, previewImgWebp2x, id } = promoCamera;

  return (
    <div className="banner">
      <Picture
        previewImg={previewImg}
        previewImgWebp={previewImgWebp}
        previewImgWebp2x={previewImgWebp2x}
        previewImg2x={previewImg2x}
        name={name}
        size={PictureSize.PROMO_PICTURE}
      />
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {name}
        </span>
        <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
        </span>
        <Link className="btn" to={`${AppRoute.Product}/${id}`}>
          Подробнее
        </Link>
      </p>
    </div>
  );
}

export default Bunner;
