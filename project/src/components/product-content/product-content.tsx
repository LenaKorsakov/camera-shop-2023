import { memo } from 'react';

import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CameraInfo from '../camera-info/camers-info';
import ReviewBlock from '../review-block/review-block';
import SimilarCamerasList from '../similar-cameras-list/similar-cameras-list';

import { useAppSelector } from '../../hooks';
import { getSimilarCameras, getSortedReviews } from '../../store/product-process/product-data-selectors';

import { capitalizeFirstLetter } from '../../utiles/format';

import { Camera } from '../../@types/camera-types';
import ButtonToTop from '../button-to-top/button-to-top';
import ReviewModal from '../review-modal/review-modal';

type ProductContentProps = {
  camera: Camera;
}

function ProductContent({camera}: ProductContentProps): JSX.Element {
  const similarCameras = useAppSelector(getSimilarCameras);
  const reviews = useAppSelector(getSortedReviews);

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
          {reviews.length > 0 &&
          <ReviewBlock
            reviews={reviews}
          />}
        </div>
      </div>
      <ButtonToTop/>
      <ReviewModal/>
    </main>
  );
}

export default memo(ProductContent);
