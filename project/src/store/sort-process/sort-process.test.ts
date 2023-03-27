import { changeSortOrder, changeSortType, initialStateSort, resetSortOrder, sortProcess, resetSortType } from './sort-process';

import { SortByTypeServerValue } from '../../const/sort-by-type';
import { UNKNOWN_ACTION } from '../../utiles/mock';
import { SortByOrderServerValue } from '../../const/sort-by-order';

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
    expect(sortProcess.reducer(state, {type: changeSortType.type, payload: SortByTypeServerValue.Popular}))
      .toEqual({...state, currentSortType: SortByTypeServerValue.Popular });
  });
  it('should update sort order if dispatch changeSortOrder', () => {
    expect(sortProcess.reducer(state, {type: changeSortOrder.type, payload: SortByOrderServerValue.OrderDown}))
      .toEqual({...state, currentSortOrder: SortByOrderServerValue.OrderDown });
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
