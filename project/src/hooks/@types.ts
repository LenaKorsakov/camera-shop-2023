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

interface UseSliderProps {
  contentPerSlide: number;
  productQty: number;
}

interface UseSliderReturn {
  firstContentIndex: number;
  lastContentIndex: number;
  nextSlide: () => void;
  prevSlide: () => void;
}

export type UseSlider = (argument: UseSliderProps) => UseSliderReturn;
