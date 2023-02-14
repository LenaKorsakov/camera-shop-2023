interface UsePaginationProps {
  contentPerPage: number;
  productQty: number;
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

export type UsePaganation = (argument: UsePaginationProps) => UsePaganationReturn;
