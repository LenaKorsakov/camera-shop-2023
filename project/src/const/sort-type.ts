enum SortTypeTitle {
  Price = 'по цене',
  Popular= 'по популярности'
}

enum SortTypeID {
  Price = 'sortPrice',
  Popular= 'sortPopular'
}

export enum ServerTypeValue {
  Price ='price',
  Popular='rating',
}


export const SORT_TYPE = [
  {title: SortTypeTitle.Price, id: SortTypeID.Price, value: ServerTypeValue.Price},
  {title: SortTypeTitle.Popular, id: SortTypeID.Popular, value: ServerTypeValue.Popular},
] ;
