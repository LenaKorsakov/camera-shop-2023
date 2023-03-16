enum SortOrderTitle {
  Up = 'По возрастанию',
  Down = 'По убыванию'
}

enum SortOrderID {
  Up = 'up',
  Down = 'down'
}

export const SORT_ORDER = [
  {title: SortOrderTitle.Up, id: SortOrderID.Up},
  {title: SortOrderID.Up, id: SortOrderID.Down},
];
