enum SortTypeTitle {
  Price = 'по цене',
  Popular= 'по популярности'
}

enum SortTypeID {
  Price = 'sortPrice',
  Popular= 'sortPopular'
}

export const SORT_TYPE = [
  {title: SortTypeTitle.Price, id: SortTypeID.Price},
  {title: SortTypeTitle.Popular, id: SortTypeID.Popular},
] ;
