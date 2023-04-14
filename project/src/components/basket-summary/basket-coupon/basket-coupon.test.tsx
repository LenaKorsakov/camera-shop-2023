import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import BasketCoupon from './basket-coupon';

import { mockStore } from '../../../utils/mock';
import { CouponValidityStatus } from '../../../const/coupon-validity-status';

describe('Component: Basket Coupon', () => {
  const handleCouponInputChange = jest.fn();
  const handleCouponFormSubmit = jest.fn();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketCoupon
            coupon=''
            onCouponInputChange={handleCouponInputChange}
            onCouponFormSubmit={handleCouponFormSubmit}
            couponValidityStatus={CouponValidityStatus.Default}
            isBasketEmpty
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toBeInTheDocument();
  });

  it('should render correctly when coupon is valid', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketCoupon
            coupon=''
            onCouponInputChange={handleCouponInputChange}
            onCouponFormSubmit={handleCouponFormSubmit}
            couponValidityStatus={CouponValidityStatus.Valid}
            isBasketEmpty
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Промокод принят!/i)).toBeInTheDocument();
  });
  it('should render correctly when coupon is not valid', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketCoupon
            coupon=''
            onCouponInputChange={handleCouponInputChange}
            onCouponFormSubmit={handleCouponFormSubmit}
            couponValidityStatus={CouponValidityStatus.NotValid}
            isBasketEmpty
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Промокод неверный/i)).toBeInTheDocument();
  });
  it('should render correctly when coupon sending error', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketCoupon
            coupon=''
            onCouponInputChange={handleCouponInputChange}
            onCouponFormSubmit={handleCouponFormSubmit}
            couponValidityStatus={CouponValidityStatus.Error}
            isBasketEmpty
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Ошибка отправки/i)).toBeInTheDocument();
  });
});
