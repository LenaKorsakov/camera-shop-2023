import { ProductData } from '../../@types/store-types';
import { fakeCamera, fakeCameras, UNKNOWN_ACTION } from '../../utiles/mock';
import { fetchCameraByIdAction, fetchSimilarCamerasAction } from '../api-actions/api-actions';
import { initialStateProduct, productData } from './product-process';

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
      .toEqual({...state, camera: fakeCamera, isLoading: false });
  });
  it('should change loading status to true if camera loading', () => {
    expect(productData.reducer(state, {type: fetchCameraByIdAction.pending.type}))
      .toEqual({...state, isLoading: true });
  });
  it('should change loading status to false if fetchCameraByIdAction rejected', () => {
    expect(productData.reducer(state, {type: fetchCameraByIdAction.rejected.type}))
      .toEqual({...state, isLoading: false});
  });
  it('should return cameras if fetchSimilarCamerasAction fulfiled', () => {
    expect(productData.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...state, similarCameras: fakeCameras});
  });
});
