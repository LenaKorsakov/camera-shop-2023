import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import Logo from './logo';
import HistoryRouter from '../history-route/history-router';

import { mockStore } from '../../utiles/mock';
import { ComponentName } from '../../const/component-name';
import { AppRoute } from '../../const/app-route';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly in header component', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Logo currentComponent={ComponentName.Header} />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('header__logo');
  });

  it('should render correctly in footer component', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Logo currentComponent={ComponentName.Footer} />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('footer__logo');
  });

  it('should redirect to the main page when user click on the link', async () => {
    history.push('/logo');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/logo'
            element={<Logo currentComponent={ComponentName.Footer}/>}
          />
          <Route
            path={AppRoute.Main}
            element={<h1>Main screen!</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByTestId('link'));
    expect(screen.getByText(/Main screen!/i)).toBeInTheDocument();
  });
});
