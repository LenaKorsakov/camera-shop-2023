import { Link } from 'react-router-dom';

import Picture from '../picture/picture';

import { useAppSelector } from '../../hooks';
import { getPromoCamera, getPromoCameraFetchStatus } from '../../store/catalog-process/catalog-process-selectors';

import { AppRoute } from '../../const/app-route';
import { PictureSize } from '../../const/picture-size';
import { ComponentName } from '../../const/component-name';
import { DEFAULT_TABS_TYPE } from '../../const/tabs-buttons';
import { FetchStatus } from '../../const/fetch-status';
import LoadingPage from '../../pages/loading-page/loading-page';

function Banner(): JSX.Element {

  const promoCamera = useAppSelector(getPromoCamera);
  const { name, previewImg, previewImgWebp, previewImg2x, previewImgWebp2x, id } = promoCamera;

  const fetchStatus = useAppSelector(getPromoCameraFetchStatus);

  return (
    <div className="banner">
      {fetchStatus === FetchStatus.Loading && <LoadingPage/>}
      {fetchStatus === FetchStatus.Success && promoCamera &&
      <>
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
          <Link
            data-testid = "link"
            className="btn"
            to={`${AppRoute.Product}/${id}?${ComponentName.Tab}=${DEFAULT_TABS_TYPE}`}
          >
          Подробнее
          </Link>
        </p>
      </>}
    </div>
  );
}

export default Banner;
