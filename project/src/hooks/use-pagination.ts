import { useState } from 'react';

import { UsePaganation } from './@types';

import { MIN_PAGE_NUMBER } from '../const/const';

const usePagination: UsePaganation = ({contentPerPage, productAmount}) => {
  const [page, setPage] = useState<number>(MIN_PAGE_NUMBER);

  const pageAmount = Math.ceil(productAmount / contentPerPage);
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;
  const pagesNumbers = Array.from({length: pageAmount}, (_, index) => index + 1 );

  const changePage = (direction: boolean) => {
    setPage((prevState) => {
      if (direction) {
        if (prevState === pageAmount) {
          return prevState;
        }
        return prevState + 1;
      } else {
        if (prevState === MIN_PAGE_NUMBER) {
          return prevState;
        }
        return prevState - 1;
      }
    });
  };

  const setCurrentPage = (currentPageNumber: number) => {
    if (currentPageNumber > pageAmount) {
      setPage(pageAmount);
    } else if (currentPageNumber < MIN_PAGE_NUMBER) {
      setPage(MIN_PAGE_NUMBER);
    } else {
      setPage(currentPageNumber);
    }
  };

  return {
    page,
    totalPages: pageAmount,
    firstContentIndex,
    lastContentIndex,
    pagesNumbers,
    goToNextPage: () => changePage(true),
    goToPrevPage: () => changePage(false),
    setPage: setCurrentPage
  };
};

export default usePagination;
