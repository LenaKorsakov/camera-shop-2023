import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { mockStore, fakeCamera} from '../../utiles/mock';
import ProductContent from './product-content';


describe('Component: Product Content', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductContent
            camera={fakeCamera}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByTestId('card').length).not.toBe(0);
    expect(screen.getByTestId('reviewBlock')).toBeInTheDocument();
  });
});
