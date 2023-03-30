import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ProductPage from './product-page';

import { mockStore } from '../../utils/mock';

describe('Component: Product Page', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('reviewBlock')).toBeInTheDocument();
  });
});
