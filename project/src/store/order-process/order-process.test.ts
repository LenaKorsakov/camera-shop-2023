import { sendCouponAction, sendOrderAction } from '../api-actions/api-actions';
import { addCameraToBasket, initialStateOrder, orderProcess } from './order-process';

import { UNKNOWN_ACTION, fakeCamera, fakeCameras } from '../../utils/mock';
import { FetchStatus } from '../../const/fetch-status';

import { OrderData } from '../../@types/store-types';

describe('Reducer: orderProcess', () => {
  let state: OrderData;

  beforeEach(() => {
    state = initialStateOrder;
  });
  it('without additional parameters should return initial state', () => {
    expect(orderProcess.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should reset state and change order sending status to success and if sendOrderAction fulfiled', () => {
    expect(orderProcess.reducer({
      camerasInBasket: fakeCameras,
      selectedCamera: fakeCamera,
      coupon: 777,
      orderSendingStatus: FetchStatus.Loading,
      couponSendingStatus: FetchStatus.Loading
    }, {type: sendOrderAction.fulfilled.type}))
      .toEqual({...state, orderSendingStatus: FetchStatus.Success});
  });
  it('should change order sending status to loading and if sendOrderAction pending', () => {
    expect(orderProcess.reducer(state, {type: sendOrderAction.pending.type}))
      .toEqual({...state, orderSendingStatus: FetchStatus.Loading});
  });
  it('should change order sending status to error and if sendOrderAction rejected', () => {
    expect(orderProcess.reducer(state, {type: sendOrderAction.rejected.type}))
      .toEqual({...state, orderSendingStatus: FetchStatus.Error});
  });
  it('should update coupon and change coupon sending status to success and if sendCouponAction fulfiled', () => {
    expect(orderProcess.reducer(state, {type: sendCouponAction.fulfilled.type, payload: 777}))
      .toEqual({...state, couponSendingStatus: FetchStatus.Success, coupon: 777});
  });
  it('should change coupon sending status to success and if sendCouponAction fulfiled and coupon does not exist', () => {
    expect(orderProcess.reducer(state, {type: sendCouponAction.fulfilled.type, payload: null}))
      .toEqual({...state, couponSendingStatus: FetchStatus.Success});
  });
  it('should change coupon sending status to loading and if sendCouponAction pending', () => {
    expect(orderProcess.reducer(state, {type: sendCouponAction.pending.type}))
      .toEqual({...state, couponSendingStatus: FetchStatus.Loading});
  });
  it('should change coupon sending status to error and if sendCouponAction rejected', () => {
    expect(orderProcess.reducer(state, {type: sendCouponAction.rejected.type}))
      .toEqual({...state, couponSendingStatus: FetchStatus.Error});
  });
  it('should add camera in basket', () => {
    expect(orderProcess.reducer(state, addCameraToBasket(fakeCamera)))
      .toEqual({...state, camerasInBasket: [fakeCamera]});
  });
});
