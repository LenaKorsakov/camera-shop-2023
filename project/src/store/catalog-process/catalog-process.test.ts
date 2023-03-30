import { fetchAllCameraAction, fetchPromoAction, fetchSearchCameraAction } from '../api-actions/api-actions';
import { catalogData, initialStateCatalog } from './catalog-process';
import { fakeCameras, fakePromo, UNKNOWN_ACTION } from '../../utils/mock';
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
  it('should update cameras and change  catalog loading status if fetchAllCameraAction fulfiled', () => {
    expect(catalogData.reducer(state, {type: fetchAllCameraAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...state, cameras: fakeCameras, catalogLoadingStatus: FetchStatus.Success });
  });
  it('should change catalog loading status to loading if cameras loading', () => {
    expect(catalogData.reducer(state, {type: fetchAllCameraAction.pending.type}))
      .toEqual({...state, catalogLoadingStatus: FetchStatus.Loading });
  });
  it('should change loading status to error if fetchAllCameraAction rejected', () => {
    expect(catalogData.reducer(state, {type: fetchAllCameraAction.rejected.type}))
      .toEqual({...state, catalogLoadingStatus: FetchStatus.Error});
  });
  it('should return promoCamera if fetchPromoAction fulfiled and change fetching status to success', () => {
    expect(catalogData.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: fakePromo}))
      .toEqual({...state, promoCamera: fakePromo, promoCameraFetchingStatus: FetchStatus.Success });
  });
  it('should change fetching status to loading if fetchPromoAction pending', () => {
    expect(catalogData.reducer(state, {type: fetchPromoAction.pending.type, payload: fakePromo}))
      .toEqual({...state, promoCameraFetchingStatus: FetchStatus.Loading });
  });
  it('should change fetching status to error if fetchPromoAction rejected', () => {
    expect(catalogData.reducer(state, {type: fetchPromoAction.rejected.type, payload: fakePromo}))
      .toEqual({...state, promoCameraFetchingStatus: FetchStatus.Error });
  });
  it('should update searchCameras and change status to success if fetchSearchCameraAction fulfiled', () => {
    expect(catalogData.reducer(state, {type: fetchSearchCameraAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...state, searchCameras: fakeCameras, searchedCamerasFetchingStatus: FetchStatus.Success });
  });
  it('should change status to error if fetchSearchCameraAction rejected', () => {
    expect(catalogData.reducer(state, {type: fetchSearchCameraAction.rejected.type}))
      .toEqual({...state, searchedCamerasFetchingStatus: FetchStatus.Error });
  });
  it('should change status to loading if fetchSearchCameraAction pending', () => {
    expect(catalogData.reducer(state, {type: fetchSearchCameraAction.pending.type}))
      .toEqual({...state, searchedCamerasFetchingStatus: FetchStatus.Loading });
  });
});


