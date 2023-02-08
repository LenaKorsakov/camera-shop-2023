import Bunner from '../components/banner/banner';
import Header from '../components/header/header';
import Filters from '../components/filters/filters';
import Sort from '../components/sort/sort';
import CameraCard from '../components/camera-card/camera-card';
import Footer from '../footer/footer';
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';

function MainPage(): JSX.Element {
  return (
    <>
      <Header/>
      <main>
        <Bunner/>
        <div className="page-content">
          <Breadcrumbs/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <Filters/>
                <div className="catalog__content">
                  <Sort/>
                  <div className="cards catalog__cards">
                    <CameraCard isActive={false}/>
                    (//TODO map)
                  </div>
                  <div className="pagination">
                    <ul className="pagination__list">
                      <li className="pagination__item">
                        <a
                          className="pagination__link pagination__link--active"
                          href="//TODO"
                        >
                      1
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a className="pagination__link" href="//TODO">
                      2
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a className="pagination__link" href="//TODO">
                      3
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a
                          className="pagination__link pagination__link--text"
                          href="//TODO"
                        >
                      Далее
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </>);
}

export default MainPage;
