import { fetchAllCameraAction, fetchCameraByIdAction, fetchPricesAction, fetchPromoAction, fetchReviewsByIdAction, fetchSearchCameraAction, fetchSimilarCamerasAction, sendReviewAction } from './api-actions';
import { fakeCamera, fakeCameras, fakeId, fakePromo, fakeReviewPost, fakeReviews, getMockStore, mockApi, mockState } from '../../utils/mock';
import { catalogData } from '../catalog-process/catalog-process';

import { ApiRoute } from '../../const/api-route';
import { QueryKey } from '../../const/query-key';
import { SortByTypeServerValue } from '../../const/sort-by-type';
import { NameSpace } from '../../const/name-space';
import { FetchStatus } from '../../const/fetch-status';
import { SortByOrderServerValue } from '../../const/sort-by-order';

describe('Asynk actions: test', () => {
  it('fetchAllCameraAction should return cameras if server return 200 and change catalogLoadingStatus to success', async () => {
    mockApi
      .onGet(ApiRoute.Cameras, {params: {
        [QueryKey.FilterType]: [],
        [QueryKey.FilterLevel]: [],
        [QueryKey.FilterCategory]: null,
        [QueryKey.BottomPrice]: null,
        [QueryKey.TopPrice]: null,
        [QueryKey.SortOrder]: null,
        [QueryKey.SortType]: null,
      }})
      .reply(200, fakeCameras);

    const store = getMockStore(mockState);
    const {payload} = await store.dispatch(fetchAllCameraAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchAllCameraAction.pending.type,
        fetchAllCameraAction.fulfilled.type,
      ]);

    expect(payload).toEqual(fakeCameras);

    expect(catalogData.reducer(mockState[NameSpace.CatalogData],
      {type: fetchAllCameraAction.fulfilled.type}
    ).catalogLoadingStatus).toBe(FetchStatus.Success);
  });


  it('fetchAllCameraAction should not return cameras if server return 400', async() => {
    mockApi
      .onGet(ApiRoute.Cameras, {params: {
        [QueryKey.FilterType]: [],
        [QueryKey.FilterLevel]: [],
        [QueryKey.FilterCategory]: null,
        [QueryKey.BottomPrice]: null,
        [QueryKey.TopPrice]: null,
        [QueryKey.SortOrder]: null,
        [QueryKey.SortType]: null,
      }})
      .reply(400);

    const store = getMockStore(mockState);
    await store.dispatch(fetchAllCameraAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchAllCameraAction.pending.type,
        fetchAllCameraAction.rejected.type,
      ]);


    expect(catalogData.reducer(mockState[NameSpace.CatalogData],
      {type: fetchAllCameraAction.rejected.type}
    ).catalogLoadingStatus).toBe(FetchStatus.Error);
  });

  it('should dispatch Fetch Prices', async() => {
    mockApi
      .onGet(ApiRoute.Cameras, {params: {
        [QueryKey.FilterType]: [],
        [QueryKey.FilterLevel]: [],
        [QueryKey.FilterCategory]: null,
        [QueryKey.BottomPrice]: null,
        [QueryKey.TopPrice]: null,
        [QueryKey.SortType]: null,
      }})
      .reply(200);

    const store = getMockStore(mockState);
    await store.dispatch(fetchPricesAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchPricesAction.pending.type,
        fetchPricesAction.rejected.type,
      ]);
  });
  it('should be rejected type when Fetch High Price error', async() => {
    mockApi
      .onGet(ApiRoute.Cameras, {params: {
        [QueryKey.FilterType]: [],
        [QueryKey.FilterLevel]: [],
        [QueryKey.FilterCategory]: null,
        [QueryKey.BottomPrice]: null,
        [QueryKey.TopPrice]: null,
        [QueryKey.SortOrder]: SortByOrderServerValue.OrderUp,
        [QueryKey.SortType]: SortByTypeServerValue.Price
      }})
      .reply(400);

    const store = getMockStore(mockState);
    await store.dispatch(fetchPricesAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchPricesAction.pending.type,
        fetchPricesAction.rejected.type,
      ]);
  });


  it('fetchSearchCameraAction should return cameras if server return 200', async() => {
    mockApi
      .onGet(ApiRoute.Cameras)
      .reply(200, fakeCameras);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchSearchCameraAction('a'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSearchCameraAction.pending.type,
      fetchSearchCameraAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeCameras);
  });
  it('fetchSearchCameraAction should not return cameras if server return 400', async() => {
    mockApi
      .onGet(ApiRoute.Cameras)
      .reply(400);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchSearchCameraAction('a'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSearchCameraAction.pending.type,
      fetchSearchCameraAction.rejected.type
    ]);
  });
  it('fetchSimilarCameras  should return similar cameras if server return 200', async() => {
    mockApi
      .onGet(`${ApiRoute.Cameras}/${fakeId}/similar`)
      .reply(200, fakeCameras);

    const store = getMockStore();
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

    const store = getMockStore();
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

    const store = getMockStore();
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

    const store = getMockStore();
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

    const store = getMockStore();
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

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchReviewsByIdAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsByIdAction.pending.type,
      fetchReviewsByIdAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeReviews);
  });
  it('fetchReviewAction should not return reviews if server return 400', async() => {
    mockApi
      .onGet(`${ApiRoute.Cameras}/${fakeId}/reviews`)
      .reply(400, fakeReviews);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchReviewsByIdAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsByIdAction.pending.type,
      fetchReviewsByIdAction.rejected.type
    ]);
  });
  it('sendReviewAction should send review if server return 200', async() => {
    mockApi
      .onPost(ApiRoute.Reviews)
      .reply(200);

    const store = getMockStore();
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

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(sendReviewAction(fakeReviewPost));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.rejected.type
    ]);
  });
});

