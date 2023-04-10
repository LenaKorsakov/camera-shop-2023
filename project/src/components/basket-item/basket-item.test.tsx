import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import BasketItem from './basket-item';

import { fakeCamera, mockStore} from '../../utils/mock';

describe('Component: Basket Item', () => {
  const handleRemoveCameraFromBasket = jest.fn();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketItem camera={fakeCamera} onRemoveCameraFromBasketButtonClick={handleRemoveCameraFromBasket}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeCamera.level)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByTestId('basket item')).toBeInTheDocument();
  });

  it('should call callback when click on delete button', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketItem camera={fakeCamera} onRemoveCameraFromBasketButtonClick={handleRemoveCameraFromBasket}/>
        </MemoryRouter>
      </Provider>
    );

    const deleteButton = screen.getByLabelText('Удалить товар');
    fireEvent.click(deleteButton);

    expect(handleRemoveCameraFromBasket).toBeCalled();
  });
});
