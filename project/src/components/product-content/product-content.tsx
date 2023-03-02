import { memo } from 'react';

import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CameraInfo from '../camera-info/camera-info';
import ReviewBlock from '../review-block/review-block';
import SimilarCamerasList from '../similar-cameras-list/similar-cameras-list';

import { getSimilarCameras } from '../../store/product-process/product-data-selectors';

import { useAppSelector } from '../../hooks';

import { capitalizeFirstLetter } from '../../utiles/format';

import { Camera } from '../../@types/camera-types';

type ProductContentProps = {
  camera: Camera;
}

function ProductContent({camera}: ProductContentProps): JSX.Element {
  const similarCameras = useAppSelector(getSimilarCameras);

  return (
    <main>
      <div className="page-content">
        <Breadcrumbs
          isCatalogActive={false}
          isProductPage
          productName={`${capitalizeFirstLetter(camera.category)} «${capitalizeFirstLetter(camera.name)}»`}
        />
        <div className="page-content__section">
          <CameraInfo camera={camera}/>
        </div>
        <div className="page-content__section">
          <section className="product-similar">
            {similarCameras.length > 0 &&
              <SimilarCamerasList
                cameras={similarCameras}
              />}
          </section>
        </div>
        <div className="page-content__section">
          <ReviewBlock cameraId = {camera.id}/>
        </div>
      </div>
    </main>
  );
}

export default memo(ProductContent);
