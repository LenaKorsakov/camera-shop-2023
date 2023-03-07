import { fetchReviewsByIdAction, sendReviewAction } from '../api-actions/api-actions';
import { fakeReviews, UNKNOWN_ACTION } from '../../utiles/mock';
import { ReviewData } from '../../@types/store-types';
import { changeSuccessStatus, initialStateReview, reviewData } from './review-process';

describe('Reducer: reviewData', () => {
  let state: ReviewData;

  beforeEach(() => {
    state = initialStateReview;
  });
  it('without additional parameters should return initial state', () => {
    expect(reviewData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should update reviews and change loading status if fetchReviewAction fulfiled', () => {
    expect(reviewData.reducer(state, {type: fetchReviewsByIdAction.fulfilled.type, payload: fakeReviews}))
      .toEqual({...state, reviews: fakeReviews, isLoading: false });
  });
  it('should change loading status to true if reviews loading', () => {
    expect(reviewData.reducer(state, {type: fetchReviewsByIdAction.pending.type}))
      .toEqual({...state, isLoading: true });
  });
  it('should change loading status to false if fetchReviewAction rejected', () => {
    expect(reviewData.reducer(state, {type: fetchReviewsByIdAction.rejected.type}))
      .toEqual({...state, isLoading: false});
  });
  it('should update success status to true and sending status to false and if sendReviewAction fulfiled', () => {
    expect(reviewData.reducer(state, {type: sendReviewAction.fulfilled.type}))
      .toEqual({...state, isSuccess: true, isSending: false});
  });
  it('should update success status and sending status to false and if sendReviewAction rejected', () => {
    expect(reviewData.reducer(state, {type: sendReviewAction.rejected.type}))
      .toEqual({...state, isSuccess: false, isSending: false});
  });
  it('should update sending status to true and if sendReviewAction pending', () => {
    expect(reviewData.reducer(state, {type: sendReviewAction.pending.type}))
      .toEqual({...state, isSending: true});
  });
  it('should change success status', () => {
    expect(reviewData.reducer(state, {type: changeSuccessStatus, payload: true}))
      .toEqual({...state, isSuccess: true});
  });
});


