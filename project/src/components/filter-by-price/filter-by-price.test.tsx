import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {Provider} from 'react-redux';

import FilterByPrice from './filter-by-price';

import { mockStore } from '../../utils/mock';

describe('Component: Filters', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <FilterByPrice
            bottomPrice={''}
            topPrice={''}
            onBottomPriceChange = {jest.fn()}
            onTopPriceChange={jest.fn()}
          />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-price')).toBeInTheDocument();
  });
});


