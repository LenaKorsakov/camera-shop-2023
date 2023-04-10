import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import AddItemButton from './add-item-buttons';

import { fakeCamera, mockStore } from '../../../utils/mock';

describe('Component: Add item buttons', () => {
  const handleOpenSuccessModal = jest.fn();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <AddItemButton camera={fakeCamera} onCloseModal={jest.fn()} onOpenSuccessModal={handleOpenSuccessModal}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });

  it('onOpenSuccessModal should called when click on the button', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <AddItemButton camera={fakeCamera} onCloseModal={jest.fn()} onOpenSuccessModal={handleOpenSuccessModal}/>
        </MemoryRouter>
      </Provider>
    );

    const addButton = screen.getByText(/Добавить в корзину/i);
    fireEvent.click(addButton);

    expect(handleOpenSuccessModal).toBeCalled();
  });
});
