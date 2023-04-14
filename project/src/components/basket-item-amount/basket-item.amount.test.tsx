import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import BasketItemAmount from './basket-item-amount';

import { fakeCamera, mockStore} from '../../utils/mock';

describe('Component: Basket Item Amount', () => {
  const handleChangeCameraAmount = jest.fn();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketItemAmount camera={fakeCamera} onCameraAmountChange={handleChangeCameraAmount} camerasAmount={2}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('уменьшить количество товара')).toBeInTheDocument();
    expect(screen.getByLabelText('количество товара')).toBeInTheDocument();
    expect(screen.getByLabelText('увеличить количество товара')).toBeInTheDocument();
  });

  it('should call callback when click on increase or decrease button', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketItemAmount camera={fakeCamera} onCameraAmountChange={handleChangeCameraAmount} camerasAmount={2}/>
        </MemoryRouter>
      </Provider>
    );

    const decreaseButton = screen.getByTestId('descrease-button');
    fireEvent.click(decreaseButton);

    const increaseButton = screen.getByTestId('increase-button');
    fireEvent.click(increaseButton);

    expect(handleChangeCameraAmount).toBeCalledTimes(2);
  });
});
