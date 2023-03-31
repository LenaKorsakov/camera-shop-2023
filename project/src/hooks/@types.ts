interface UsePaginationProps {
  contentPerPage: number;
  productAmount: number;
}

interface UsePaganationReturn {
  page: number;
  totalPages: number;
  firstContentIndex: number;
  lastContentIndex: number;
  pagesNumbers: number[];
  goToNextPage: () => void;
  goToPrevPage: () => void;
  setPage: (page: number) => void;
}

export type UsePaganation = (argument: UsePaginationProps) => UsePaganationReturn;
