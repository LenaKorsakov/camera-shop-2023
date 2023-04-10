import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import RemoveItemButtons from './remove-item-buttons';

import { fakeCamera, mockStore } from '../../../utils/mock';
import { formatPrice } from '../../../utils/format';

describe('Component: Remove item buttons', () => {
  const handleCloseModal = jest.fn();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <RemoveItemButtons cameraId = {fakeCamera.id} onCloseModal={handleCloseModal}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('continue shopping')).toBeInTheDocument();
    expect(screen.queryByText(`${formatPrice(fakeCamera.price)} ₽`)).not.toBeInTheDocument();
  });

  it('onCloseModal should called when click on the button', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <RemoveItemButtons cameraId = {fakeCamera.id} onCloseModal={handleCloseModal}/>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByTestId('continue shopping');
    fireEvent.click(closeButton);

    expect(handleCloseModal).toBeCalled();
  });
});
