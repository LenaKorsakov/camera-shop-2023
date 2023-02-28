import { createMemoryHistory } from 'history';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRoute from '../history-route/history-route';
import App from './app';
import { mockStore } from '../../utiles/mock';

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={mockStore}>
    <HistoryRoute history={history}>
      <App />
    </HistoryRoute>
  </Provider>
);

describe('Application Routing', () => {
  window.scrollTo = jest.fn();

  afterAll(() => jest.clearAllMocks());

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getAllByText('Страница не найдена')).toBeInTheDocument();
    expect(screen.getAllByText('Вернуться к каталогу товаров')).toBeInTheDocument();

  });

});
