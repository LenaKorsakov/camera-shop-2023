import { useState } from 'react';
import { MIN_PAGE_NUMBER } from '../const/const';

interface UsePaginationProps {
  contentPerPage: number;
  count: number;
}

interface UsePaganationReturn {
  page: number;
  totalPages: number;
  firstContentIndex: number;
  lastContentIndex: number;
  pagesNumbers: number[];
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

type UsePaganation = (arg: UsePaginationProps) => UsePaganationReturn;

const usePagination: UsePaganation = ({contentPerPage, count}) => {
  const [page, setPage] = useState<number>(MIN_PAGE_NUMBER);

  const pageCount = Math.ceil(count / contentPerPage);
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;
  const pagesNumbers = Array.from({length: pageCount}, (_, index) => index + 1 );

  const changePage = (direction: boolean) => {
    setPage((prevState) => {
      if (direction) {
        if (prevState === pageCount) {
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
    if (currentPageNumber > pageCount) {
      setPage(pageCount);
    } else if (currentPageNumber < MIN_PAGE_NUMBER) {
      setPage(MIN_PAGE_NUMBER);
    } else {
      setPage(currentPageNumber);
    }
  };

  return {
    page,
    totalPages: pageCount,
    firstContentIndex,
    lastContentIndex,
    pagesNumbers,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setCurrentPage
  };
};

export default usePagination;
