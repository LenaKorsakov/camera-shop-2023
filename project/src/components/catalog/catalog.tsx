import { memo, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Filters from '../filters/filters';
import Sort from '../sort/sort';
import CameraCard from '../camera-card/camera-card';
import PaginationItem from '../pagination-item/pagination-item';
import PaginationButton from '../pagination-item/pagination-button';

import usePagination from '../../hooks/use-pagination';

import { Cameras } from '../../@types/camera-types';

import { CONTENT_PAR_PAGE as CONTENT_PER_PAGE, MIN_PAGE_NUMBER } from '../../const/const';
import { PaginationButtonName } from '../../const/pagination-buttons-name';
import { AppRoute } from '../../const/app-route';

type CatalogProps = {
  cameras: Cameras;
}

function Catalog({cameras}: CatalogProps): JSX.Element {
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    pagesNumbers,
    totalPages,
  } = usePagination({
    contentPerPage: CONTENT_PER_PAGE,
    productQty: cameras.length,
  });

  const { pageNum } = useParams() as {pageNum: string};
  const currentPageNum = + pageNum;

  useEffect(() => {
    currentPageNum > 1 ? setPage(currentPageNum) : setPage(MIN_PAGE_NUMBER);

  }, [currentPageNum, setPage]);

  const contentCameras = cameras.slice(firstContentIndex, lastContentIndex);

  const isFirstPage = page === MIN_PAGE_NUMBER;
  const isLastPage = page === totalPages;

  const handlePaginationItemClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleButtonPrevClick = () => {
    prevPage();
  };

  const handleButtonNextClick = () => {
    nextPage();
  };

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <Filters/>
          <div className="catalog__content">
            <Sort/>
            <div className="cards catalog__cards">
              {contentCameras.map((camera) => (
                <CameraCard
                  camera={camera}
                  isActive={false}
                  key={camera.id}
                />
              ))}
            </div>
            <div className="pagination">
              <ul className="pagination__list">

                {!isFirstPage &&
                <PaginationButton
                  name={PaginationButtonName.Prev}
                  onPaginationButtonClick={handleButtonPrevClick}
                  linkProp={`${AppRoute.Catalog}${page - 1}`}
                />}

                {pagesNumbers.map((number) => (
                  <PaginationItem
                    pageNum={number}
                    onPaginationItemClick={handlePaginationItemClick}
                    key={number}
                    isActive={number === page}
                  />
                ))}

                {!isLastPage &&
                  <PaginationButton
                    name={PaginationButtonName.Next}
                    onPaginationButtonClick={handleButtonNextClick}
                    linkProp={`${AppRoute.Catalog}${page + 1}`}
                  />}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Catalog);
