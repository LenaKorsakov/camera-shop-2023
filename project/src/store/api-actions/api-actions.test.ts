import { fetchAllCameraAction, fetchCameraByIdAction, fetchPromoAction, fetchReviewAction, fetchSimilarCamerasAction, sendReviewAction } from './api-actions';
import { ApiRoute } from '../../const/api-route';
import { fakeCamera, fakeCameras, fakeId, fakePromo, fakeReviewPost, fakeReviews, mockApi, mockStore } from '../../utiles/mock';

describe('Asynk actions: test', () => {
  it('fetchAllCameraAction should return cameras if server return 200', async() => {
    mockApi
      .onGet(ApiRoute.Cameras)
      .reply(200, fakeCameras);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchAllCameraAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchAllCameraAction.pending.type,
      fetchAllCameraAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeCameras);
  });
  it('fetchAllCameraAction should not return cameras if server return 400', async() => {
    mockApi
      .onGet(ApiRoute.Cameras)
      .reply(400, fakeCameras);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchAllCameraAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchAllCameraAction.pending.type,
      fetchAllCameraAction.rejected.type
    ]);
  });
  it('fetchSimilarCameras  should return similar cameras if server return 200', async() => {
    mockApi
      .onGet(`${ApiRoute.Cameras}/${fakeId}/similar`)
      .reply(200, fakeCameras);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchSimilarCamerasAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeCameras);
  });
  it('fetchSimilarCameras  should not return similar cameras if server return 400', async() => {
    mockApi
      .onGet(`${ApiRoute.Cameras}/${fakeId}/similar`)
      .reply(400, fakeCameras);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchSimilarCamerasAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.rejected.type
    ]);
  });
  it('fetchCameraById should return camera if server return 200', async() => {
    mockApi
      .onGet(`${ApiRoute.Cameras}/${fakeId}`)
      .reply(200, fakeCamera);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchCameraByIdAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCameraByIdAction.pending.type,
      fetchCameraByIdAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeCamera);
  });

  it('fetchPromoAction should return promo if server return 200', async() => {
    mockApi
      .onGet(ApiRoute.Promo)
      .reply(200, fakePromo);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakePromo);
  });
  it('fetchPromoAction should not return promo if server return 400', async() => {
    mockApi
      .onGet(ApiRoute.Promo)
      .reply(400, fakePromo);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.rejected.type
    ]);
  });
  it('fetchReviewAction should return reviews if server return 200', async() => {
    mockApi
      .onGet(`${ApiRoute.Cameras}/${fakeId}/reviews`)
      .reply(200, fakeReviews);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchReviewAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewAction.pending.type,
      fetchReviewAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeReviews);
  });
  it('fetchReviewAction should not return reviews if server return 400', async() => {
    mockApi
      .onGet(`${ApiRoute.Cameras}/${fakeId}/reviews`)
      .reply(400, fakeReviews);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchReviewAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewAction.pending.type,
      fetchReviewAction.rejected.type
    ]);
  });
  it('sendReviewAction should send review if server return 200', async() => {
    mockApi
      .onPost(ApiRoute.Reviews)
      .reply(200);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(sendReviewAction(fakeReviewPost));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type
    ]);
  });
  it('sendReviewAction should not send review if server return 400', async() => {
    mockApi
      .onPost(ApiRoute.Reviews)
      .reply(400);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(sendReviewAction(fakeReviewPost));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.rejected.type
    ]);
  });
});

