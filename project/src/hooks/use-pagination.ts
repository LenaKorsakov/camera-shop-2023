import { useState } from 'react';

import { UsePaganation } from './@types';

import { MIN_PAGE_NUMBER } from '../const/const';

const usePagination: UsePaganation = ({contentPerPage, productQty}) => {
  const [page, setPage] = useState<number>(MIN_PAGE_NUMBER);

  const pageQty = Math.ceil(productQty / contentPerPage);
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;
  const pagesNumbers = Array.from({length: pageQty}, (_, index) => index + 1 );

  const changePage = (direction: boolean) => {
    setPage((prevState) => {
      if (direction) {
        if (prevState === pageQty) {
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
    if (currentPageNumber > pageQty) {
      setPage(pageQty);
    } else if (currentPageNumber < MIN_PAGE_NUMBER) {
      setPage(MIN_PAGE_NUMBER);
    } else {
      setPage(currentPageNumber);
    }
  };

  return {
    page,
    totalPages: pageQty,
    firstContentIndex,
    lastContentIndex,
    pagesNumbers,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setCurrentPage
  };
};

export default usePagination;
