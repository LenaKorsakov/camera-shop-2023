enum SortOrderTitle {
  OrderUp = 'По возрастанию',
  OrderDown = 'По убыванию'
}

enum SortOrderID {
  OrderUp = 'up',
  OrderDown = 'down'
}

export enum ServerOrderValue {
  OrderUp= 'asc',
  OrderDown='desc'
}

export const SORT_ORDER = [
  {title: SortOrderTitle.OrderUp, id: SortOrderID.OrderUp, value: ServerOrderValue.OrderUp},
  {title: SortOrderID.OrderUp, id: SortOrderID.OrderDown, value: ServerOrderValue.OrderDown},
];
