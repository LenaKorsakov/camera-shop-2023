import { ProductData } from '../../@types/store-types';
import { fakeCamera, fakeCameras, UNKNOWN_ACTION } from '../../utils/mock';
import { fetchCameraByIdAction, fetchSimilarCamerasAction } from '../api-actions/api-actions';
import { initialStateProduct, productData } from './product-process';
import { FetchStatus } from '../../const/fetch-status';

describe('Reducer: productData', () => {
  let state: ProductData;

  beforeEach(() => {
    state = initialStateProduct;
  });
  it('without additional parameters should return initial state', () => {
    expect(productData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should update camera and change loading status if fetchCameraByIdAction fulfiled', () => {
    expect(productData.reducer(state, {type: fetchCameraByIdAction.fulfilled.type, payload: fakeCamera}))
      .toEqual({...state, camera: fakeCamera, fetchStatus: FetchStatus.Success });
  });
  it('should change loading status to loading if camera loading', () => {
    expect(productData.reducer(state, {type: fetchCameraByIdAction.pending.type}))
      .toEqual({...state, fetchStatus: FetchStatus.Loading });
  });
  it('should change loading status to error if fetchCameraByIdAction rejected', () => {
    expect(productData.reducer(state, {type: fetchCameraByIdAction.rejected.type}))
      .toEqual({...state, fetchStatus: FetchStatus.Error});
  });
  it('should return cameras if fetchSimilarCamerasAction fulfiled', () => {
    expect(productData.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...state, similarCameras: fakeCameras});
  });
});
