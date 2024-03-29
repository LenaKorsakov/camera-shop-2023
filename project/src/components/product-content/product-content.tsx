import { memo } from 'react';

import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CameraInfo from '../camera-info/camera-info';
import ReviewBlock from '../review-block/review-block';
import SimilarCamerasBlock from '../similar-cameras-block/similar-cameras-block';

import { getProductFetchingStatus, getSimilarCameras } from '../../store/product-process/product-data-selectors';

import { useAppSelector } from '../../hooks';

import { Camera } from '../../@types/camera-types';
import { FetchStatus } from '../../const/fetch-status';
import LoadingPage from '../../pages/loading-page/loading-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

type ProductContentProps = {
  camera: Camera;
  onAddCameraInBasketButtonClick: () => void;
}

function ProductContent({camera, onAddCameraInBasketButtonClick}: ProductContentProps): JSX.Element {
  const cameraFetchingStatus = useAppSelector(getProductFetchingStatus);
  const similarCameras = useAppSelector(getSimilarCameras);

  return (
    <>
      {cameraFetchingStatus === FetchStatus.Loading && <LoadingPage />}
      {cameraFetchingStatus === FetchStatus.Error && <NotFoundPage />}
      {cameraFetchingStatus === FetchStatus.Success && camera &&
      <div className="page-content">
        <Breadcrumbs
          isCatalogActive={false}
          isProductPage
          productName={`${camera.category} «${camera.name}»`}
        />
        <div className="page-content__section">
          <CameraInfo
            camera={camera}
            onAddToBasketButtonClick={onAddCameraInBasketButtonClick}
          />
        </div>
        <div className="page-content__section">
          <section className="product-similar">
            {similarCameras.length > 0 &&
              <SimilarCamerasBlock
                onAddCameraInBasketButtonClick={onAddCameraInBasketButtonClick}
                cameras={similarCameras}
              />}
          </section>
        </div>
        <div className="page-content__section">
          <ReviewBlock cameraId = {camera.id}/>
        </div>
      </div>}
    </>
  );
}

export default memo(ProductContent);
