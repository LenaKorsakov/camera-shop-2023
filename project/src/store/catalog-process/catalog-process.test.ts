import { fetchAllCameraAction, fetchPromoAction, fetchSearchCameraAction } from '../api-actions/api-actions';
import { catalogData, initialStateCatalog } from './catalog-process';
import { fakeCameras, fakePromo, UNKNOWN_ACTION } from '../../utiles/mock';
import { CatalogData } from '../../@types/store-types';
import { FetchStatus } from '../../const/fetch-status';

describe('Reducer: catalogData', () => {
  let state: CatalogData;

  beforeEach(() => {
    state = initialStateCatalog;
  });
  it('without additional parameters should return initial state', () => {
    expect(catalogData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should update cameras and change loading status if fetchAllCameraAction fulfiled', () => {
    expect(catalogData.reducer(state, {type: fetchAllCameraAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...state, cameras: fakeCameras, isLoading: false });
  });
  it('should change loading status to true if cameras loading', () => {
    expect(catalogData.reducer(state, {type: fetchAllCameraAction.pending.type}))
      .toEqual({...state, isLoading: true });
  });
  it('should change loading status to false if fetchAllCameraAction rejected', () => {
    expect(catalogData.reducer(state, {type: fetchAllCameraAction.rejected.type}))
      .toEqual({...state, isLoading: false});
  });
  it('should return promo if fetchPromoAction fulfiled', () => {
    expect(catalogData.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: fakePromo}))
      .toEqual({...state, promo: fakePromo});
  });
  it('should update searchCameras and change status to success if fetchSearchCameraAction fulfiled', () => {
    expect(catalogData.reducer(state, {type: fetchSearchCameraAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...state, searchCameras: fakeCameras, fetchingStatus: FetchStatus.Success });
  });
  it('should change status to error if fetchSearchCameraAction rejected', () => {
    expect(catalogData.reducer(state, {type: fetchSearchCameraAction.rejected.type}))
      .toEqual({...state, fetchingStatus: FetchStatus.Error });
  });
  it('should change status to loading if fetchSearchCameraAction pending', () => {
    expect(catalogData.reducer(state, {type: fetchSearchCameraAction.pending.type}))
      .toEqual({...state, fetchingStatus: FetchStatus.Loading });
  });
});


