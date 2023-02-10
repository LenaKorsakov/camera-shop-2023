import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CameraInfo from '../camera-info/camers-info';
import CameraSimilar from '../camera-similar/camera-similar';
import ReviewBlock from '../review-block/review-block';

function ProductContent(): JSX.Element {
  return (
    <main>
      <div className="page-content">
        <Breadcrumbs
          isActive={false}
          isProductPage
          productName={'Название камеры'}
        />
        <div className="page-content__section">
          <CameraInfo/>
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
