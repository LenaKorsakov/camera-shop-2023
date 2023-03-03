import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import HistoryRoute from '../history-route/history-route';
import NavItem from './nav-item';

import { mockStore } from '../../utiles/mock';
import { ComponentName } from '../../const/component-name';
import { AppRoute } from '../../const/app-route';
import { NavItemsTitles } from '../../const/nav-items';

const history = createMemoryHistory();

describe('Component: Nav Item', () => {
  it('should render correctly in header component', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <NavItem
            currentComponent={ComponentName.Header}
            route={AppRoute.Main}
            title={NavItemsTitles.Delivery}
          />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('main-nav__link');

    const list = screen.getByTestId('nav');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('main-nav__item');
  });

  it('should render correctly in footer component', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <NavItem
            currentComponent={ComponentName.Footer}
            route={AppRoute.Main}
            title={NavItemsTitles.Delivery}
          />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('link');

    const list = screen.getByTestId('nav');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('footer__item');
  });

  it('should redirect to the main page when user click on the link', async () => {
    history.push('/nav');

    render(
      <HistoryRoute history={history}>
        <Routes>
          <Route
            path='/nav'
            element={
              <NavItem
                currentComponent={ComponentName.Header}
                route={AppRoute.Main}
                title={NavItemsTitles.Delivery}
              />
            }
          />
          <Route
            path={AppRoute.Main}
            element={<h1>Main screen!</h1>}
          />
        </Routes>
      </HistoryRoute>
    );

    await userEvent.click(screen.getByTestId('link'));
    expect(screen.getByText(/Main screen!/i)).toBeInTheDocument();
  });
});
