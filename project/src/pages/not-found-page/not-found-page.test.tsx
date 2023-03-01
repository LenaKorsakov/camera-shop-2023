import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { mockStore } from '../../utiles/mock';
import NotFoundPage from './not-found-page';


describe('Component: ProductPage', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <NotFoundPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Страница не найдена/)).toBeInTheDocument();
  });
});
