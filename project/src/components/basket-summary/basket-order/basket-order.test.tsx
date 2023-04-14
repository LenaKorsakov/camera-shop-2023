import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import BasketOrder from './basket-order';

import { mockStore } from '../../../utils/mock';
import { formatPrice } from '../../../utils/format';

describe('Component: Basket Coupon', () => {
  const handleOrderButtonClick = jest.fn();
  const fakeDiscount = 10;
  const fakeTotalPrice = 1000;

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketOrder
            discountPrice={fakeDiscount}
            totalPrice={fakeTotalPrice}
            onOrderButtonClick={handleOrderButtonClick}
            isBasketEmpty
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(`${formatPrice(fakeTotalPrice)} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`${formatPrice(fakeDiscount)} ₽`)).toBeInTheDocument();
    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
  });
});
