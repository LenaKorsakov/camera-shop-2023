import { createMemoryHistory } from 'history';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';

import HistoryRoute from '../history-route/history-route';
import App from './app';

import { fakeCamera, mockStore } from '../../utiles/mock';
import { AppRoute } from '../../const/app-route';
import { ComponentName } from '../../const/component-name';
import { DEFAULT_TABS_TYPE, TabType } from '../../const/tabs-buttons';

const history = createMemoryHistory();

const fakeCameraID = fakeCamera.id;

const fakeApp = (
  <Provider store={mockStore}>
    <HistoryRoute history={history}>
      <App />
    </HistoryRoute>
  </Provider>
);

describe('Application Routing', () => {
  afterAll(() => jest.clearAllMocks());

  it('should render "Catalog" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "Catalog" when user navigate to some page of сatalog', () => {
    history.push(`${AppRoute.Catalog}${1}}`);
    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to product', () => {
    history.push(`${AppRoute.Product}/${fakeCameraID}?${ComponentName.Tab}=${TabType.Description}`);
    render(fakeApp);

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });

  it('should render features when user navigate to product and features tab', () => {
    history.push(`${AppRoute.Product}/${fakeCameraID}?${ComponentName.Tab}=${DEFAULT_TABS_TYPE}`);
    render(fakeApp);

    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
  });

  it('should render "BasketPage" when user navigate to basket', () => {
    history.push(AppRoute.Basket);
    render(fakeApp);

    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/Страница не найдена/)).toBeInTheDocument();
  });
});
