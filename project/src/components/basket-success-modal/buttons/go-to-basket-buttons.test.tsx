import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import GoToBasketButtons from './go-to-basket-buttons';

import { mockStore } from '../../../utils/mock';

describe('Component: Go to basket button', () => {
  const handleCloseModal = jest.fn();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <GoToBasketButtons onCloseModal={handleCloseModal}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });

  it('onCloseModal should called when click on the each button', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <GoToBasketButtons onCloseModal={handleCloseModal}/>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByText(/Перейти в корзину/i);
    fireEvent.click(closeButton);

    const toBasketButton = screen.getByText(/Продолжить покупки/i);
    fireEvent.click(toBasketButton);

    expect(handleCloseModal).toBeCalledTimes(2);
  });
});
