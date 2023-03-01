import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import ProductPage from './product-page';
import { fakeCamera, mockStore } from '../../utiles/mock';
import HistoryRoute from '../../components/history-route/history-route';
import { AppRoute } from '../../const/app-route';
import { ComponentName } from '../../const/component-name';
import { DEFAULT_TABS_TYPE } from '../../const/tabs-buttons';

const history = createMemoryHistory();
const fakeCameraID = fakeCamera.id;

const fakeProductPage = (
  <Provider store={mockStore}>
    <HistoryRoute history={history}>
      <ProductPage />
    </HistoryRoute>
  </Provider>
);
describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    history.push(`${AppRoute.Product}/${fakeCameraID}?${ComponentName.Tab}=${DEFAULT_TABS_TYPE}`);

    render(fakeProductPage);

    expect(screen.getByText(/Страница не найдена/)).toBeInTheDocument();
    //expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });
});
