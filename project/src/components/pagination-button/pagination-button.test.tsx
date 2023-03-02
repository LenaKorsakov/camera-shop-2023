import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { mockStore } from '../../utiles/mock';

import userEvent from '@testing-library/user-event';
import PaginationButton from './pagination-button';
import { AppRoute } from '../../const/app-route';
import { PaginationButtonName } from '../../const/pagination-buttons-name';


describe('Component: Pagination Button', () => {
  const handlePaganationButtonClick = jest.fn();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PaginationButton
            onPaginationButtonClick={handlePaganationButtonClick}
            linkProp={AppRoute.Catalog}
            name={PaginationButtonName.Next}
          />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('pagination__link--text');

    expect(screen.getByText(PaginationButtonName.Next)).toBeInTheDocument();
  });

  it('should call handlePaganationButtonClick', async () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PaginationButton
            onPaginationButtonClick={handlePaganationButtonClick}
            linkProp={AppRoute.Catalog}
            name={PaginationButtonName.Next}
          />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('link'));
    expect(handlePaganationButtonClick).toBeCalled();
  });
});
