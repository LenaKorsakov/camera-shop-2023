import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import PaginationItem from './pagination-item';

import { fakeCamera, mockStore } from '../../utiles/mock';

describe('Component: Pagination Item', () => {
  const handlePaganationItemClick = jest.fn();
  const pageNumber = fakeCamera.id;

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PaginationItem
            onPaginationItemClick={handlePaganationItemClick}
            pageNum={pageNumber}
            isActive
          />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('pagination__link--active');

    expect(screen.getByText(pageNumber)).toBeInTheDocument();
  });

  it('should call handlePaganationButton and should not have active class', async () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PaginationItem
            onPaginationItemClick={handlePaganationItemClick}
            pageNum={pageNumber}
            isActive={false}
          />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveClass('pagination__link--active');

    await userEvent.click(link);
    expect(handlePaganationItemClick).toBeCalled();
  });
});
