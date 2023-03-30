import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import NotFoundPage from './not-found-page';

import { mockStore } from '../../utils/mock';


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
