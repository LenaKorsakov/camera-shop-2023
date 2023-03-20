import { changeSortOrder, changeSortType, initialStateSort, resetSort, sortProcess } from './sort-process';

import { ServerTypeValue } from '../../const/sort-type';
import { UNKNOWN_ACTION } from '../../utiles/mock';
import { ServerOrderValue } from '../../const/sort-order';

import { Sort } from '../../@types/store-types';

describe('Reducer: sort', () => {
  let state: Sort;

  beforeEach(() => {
    state = initialStateSort;
  });
  it('without additional parameters should return initial state', () => {
    expect(sortProcess.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should update sort type if dispatch changeSortType', () => {
    expect(sortProcess.reducer(state, {type: changeSortType.type, payload: ServerTypeValue.Popular}))
      .toEqual({...state, currentSortType: ServerTypeValue.Popular });
  });
  it('should update sort order if dispatch changeSortOrder', () => {
    expect(sortProcess.reducer(state, {type: changeSortOrder.type, payload: ServerOrderValue.OrderDown}))
      .toEqual({...state, currentSortOrder: ServerOrderValue.OrderDown });
  });
  it('should should return initial state if dispatch resetSort', () => {
    expect(sortProcess.reducer(state, {type: resetSort.type}))
      .toEqual(state);
  });
});
