import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import BasketSummary from './basket-summary';

import { mockStore } from '../../utils/mock';

describe('Component: Basket Summary', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketSummary onModalInfoOpen={jest.fn()}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket-order')).toBeInTheDocument();
    expect(screen.getByTestId('basket-promo')).toBeInTheDocument();
  });
});
