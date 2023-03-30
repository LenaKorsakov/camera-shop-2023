import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import EmptyPage from './empty-page';

import { mockStore } from '../../utils/mock';


describe('Component: ProductPage', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <EmptyPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Страница не найдена/)).toBeInTheDocument();
  });
});
