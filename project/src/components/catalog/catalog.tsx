import Filters from '../filters/filters';
import Sort from '../sort/sort';
import CameraCard from '../camera-card/camera-card';
import Pagination from '../pagination/pagination';
import { Cameras } from '../../@types/camera-types';

type CatalogProps = {
  cameras: Cameras;
}

function Catalog({cameras}: CatalogProps): JSX.Element {
  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <Filters/>
          <div className="catalog__content">
            <Sort/>
            <div className="cards catalog__cards">
              {cameras.map((camera) => (
                <CameraCard
                  camera={camera}
                  isActive={false}
                  key={camera.id}
                />
              ))}
            </div>
            <Pagination/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Catalog;
