import { changeSortOrder, changeSortType, initialStateSort, resetSortOrder, sortProcess, resetSortType } from './sort-process';

import { ServerTypeValue } from '../../const/sort-type';
import { UNKNOWN_ACTION } from '../../utiles/mock';
import { ServerOrderValue } from '../../const/sort-order';

import { SortData } from '../../@types/store-types';

describe('Reducer: sort', () => {
  let state: SortData;

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
  it('should should return state null if dispatch resetSortOrder', () => {
    expect(sortProcess.reducer(state, {type: resetSortOrder.type}))
      .toEqual({...state, currentSortOrder: null });
  });
  it('should should return state null if dispatch resetSortType', () => {
    expect(sortProcess.reducer(state, {type: resetSortType.type}))
      .toEqual({...state, currentSortType: null });
  });
});
