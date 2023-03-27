import { setCurrentFilterCategory, setCurrentFilterTypes, setCurrentFilterLevels, setBottomPrice, setTopPrice, resetCurrentFilterGroup, resetFilters, deleteCurrentFilter } from './filter-process';
import { fakeMaxPrice, fakeMinPrice, UNKNOWN_ACTION } from '../../utiles/mock';

import { fetchPricesAction } from '../api-actions/api-actions';
import { filterProcess, initialStateFilter } from './filter-process';

import { FilterByCategory } from '../../const/filter-by-category';
import { FilterByType } from '../../const/filter-by-type';
import { FilterByLevel } from '../../const/filter-by-level';
import { QueryKey } from '../../const/query-key';

import { FilterData } from '../../@types/store-types';

describe('Reducer: filter', () => {
  let state: FilterData;

  beforeEach(() => {
    state = initialStateFilter;
  });
  it('without additional parameters should return initial state', () => {
    expect(filterProcess.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should update filter category if dispatch setCurrentFilterCategory', () => {
    expect(filterProcess.reducer(state, {type: setCurrentFilterCategory.type, payload: FilterByCategory.Photocamera}))
      .toEqual({...state, currentFilterCategory: FilterByCategory.Photocamera });
  });
  it('should update filter type if dispatch setCurrentFilterTypes', () => {
    expect(filterProcess.reducer(state, {type: setCurrentFilterTypes.type, payload: FilterByType.Collection}))
      .toEqual({...state, currentFilterTypes: [FilterByType.Collection] });
  });
  it('should update filter level if dispatch setCurrentFilterLevels', () => {
    expect(filterProcess.reducer(state, {type: setCurrentFilterLevels.type, payload: FilterByLevel.Hobby}))
      .toEqual({...state, currentFilterLevels: [FilterByLevel.Hobby]});
  });
  it('should update bottomPrice if dispatch setBottomPrice', () => {
    expect(filterProcess.reducer(state, {type: setBottomPrice.type, payload: 100}))
      .toEqual({...state, bottomPrice: 100});
  });
  it('should update topPrice if dispatch setTopPrice', () => {
    expect(filterProcess.reducer(state, {type: setTopPrice.type, payload: 200}))
      .toEqual({...state, topPrice: 200});
  });
  it('should set min ans max prices if fetchPricesAction.fulfilled', () => {
    expect(filterProcess.reducer(state, {type: fetchPricesAction.fulfilled.type, payload: {minPrice: fakeMinPrice, maxPrice: fakeMaxPrice}}))
      .toEqual({...state, maxPrice: fakeMaxPrice, minPrice: fakeMinPrice});
  });
  it('should reset current filter group', () => {
    expect(filterProcess.reducer({...state, currentFilterLevels: [FilterByLevel.Hobby, FilterByLevel.Professional]}, resetCurrentFilterGroup(QueryKey.FilterLevel)))
      .toEqual(state);
  });
  it('should delete current filter', () => {
    expect(filterProcess.reducer({...state, currentFilterCategory: FilterByCategory.Photocamera}, deleteCurrentFilter({key: QueryKey.FilterCategory, value: FilterByCategory.Photocamera})))
      .toEqual(state);
  });
  it('should reset state', () => {
    expect(filterProcess.reducer({...state,
      currentFilterCategory: FilterByCategory.Photocamera,
      currentFilterLevels: [FilterByLevel.Hobby, FilterByLevel.Professional],
      currentFilterTypes: [FilterByType.Collection],
      bottomPrice: 100,
      topPrice: 200
    }, resetFilters()))
      .toEqual(state);
  });
});
