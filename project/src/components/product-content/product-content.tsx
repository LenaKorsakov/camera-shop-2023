import { Camera } from '../../@types/camera-types';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CameraInfo from '../camera-info/camers-info';
import CameraSimilar from '../camera-similar/camera-similar';
import ReviewBlock from '../review-block/review-block';

type ProductContentProps = {
  camera: Camera;
}

function ProductContent({camera}: ProductContentProps): JSX.Element {
  return (
    <main>
      <div className="page-content">
        <Breadcrumbs
          isActive={false}
          isProductPage
          productName={camera.name}
        />
        <div className="page-content__section">
          <CameraInfo camera={camera}/>
        </div>
        <div className="page-content__section">
          <section className="product-similar">
            <div className="container">
              <h2 className="title title--h3">Похожие товары</h2>
              <CameraSimilar/>
            </div>
          </section>
        </div>
        <div className="page-content__section">
          <ReviewBlock/>
        </div>
      </div>
    </main>
  );
}

export default ProductContent;
