import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Sort from '../sort/sort';
import CameraCard from '../camera-card/camera-card';
import PaginationItem from '../pagination-item/pagination-item';
import PaginationButton from '../pagination-button/pagination-button';
import LoadingPage from '../../pages/loading-page/loading-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import EmptyPage from '../../pages/empty-page/empty-page';

import { getCurrentParams } from '../../store/app-process/app-process-selectors';
import { getAllCameras, getCatalogLoadingStatus } from '../../store/catalog-process/catalog-process-selectors';
import usePagination from '../../hooks/use-pagination';
import { useAppSelector } from '../../hooks';

import { PaginationButtonName } from '../../const/pagination-buttons-name';
import { AppRoute } from '../../const/app-route';
import { ContentPerItem } from '../../const/content-per-item';
import { MIN_PAGE_NUMBER } from '../../const/const';
import { FetchStatus } from '../../const/fetch-status';


function Catalog(): JSX.Element {
  const cameras = useAppSelector(getAllCameras);
  const loadingStatus = useAppSelector(getCatalogLoadingStatus);
  const currentParams = useAppSelector(getCurrentParams);

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
    contentPerPage: ContentPerItem.Pagination,
    productQty: cameras.length,
  });

  const isNeedPaganation = cameras.length > ContentPerItem.Pagination;

  const { pageNum } = useParams() as {pageNum: string};
  const currentPageNum = + pageNum;

  useEffect(() => {
    currentPageNum > 1 ? setPage(currentPageNum) : setPage(MIN_PAGE_NUMBER);

  }, [currentPageNum, setPage]);

  const contentCameras = cameras.slice(firstContentIndex, lastContentIndex);

  const isFirstPage = page === MIN_PAGE_NUMBER || cameras.length === 0;
  const isLastPage = page === totalPages || totalPages === MIN_PAGE_NUMBER;

  const handlePaginationItemClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleButtonPrevClick = () => prevPage();

  const handleButtonNextClick = () => nextPage();

  return (
    <div className="catalog__content">
      <Sort/>
      {loadingStatus === FetchStatus.Loading && <LoadingPage/>}
      {loadingStatus === FetchStatus.Error && <NotFoundPage isCatalog/>}
      {loadingStatus === FetchStatus.Success && cameras.length === 0 && <EmptyPage/>}
      {loadingStatus === FetchStatus.Success &&
      <>
        <div className="cards catalog__cards">
          {contentCameras.length > 0 && contentCameras.map((camera) => (
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
                  linkProp={`${AppRoute.Catalog}${page - 1}?${currentParams}`}
                />}

            {isNeedPaganation && pagesNumbers.map((number) => (
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
                  linkProp={`${AppRoute.Catalog}${page + 1}?${currentParams}`}
                />}
          </ul>
        </div>
      </>}
    </div>
  );
}

export default Catalog;
