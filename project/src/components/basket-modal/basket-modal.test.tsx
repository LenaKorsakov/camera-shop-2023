import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import BasketModal from './basket-modal';

import { fakeCamera, getMockStore} from '../../utils/mock';
import { ModalType } from '../../const/modal-type';
import { NameSpace } from '../../const/name-space';

const store = getMockStore({
  [NameSpace.Order]: {
    selectedCamera: fakeCamera,
  }
});

describe('Component: Basket Modal', () => {

  it('should render correctly add camera in basket modal', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BasketModal onCloseModal={jest.fn()} onOpenSuccessModal={jest.fn()} modalType={ModalType.AddCameraInBasket}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket-modal')).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.vendorCode)).toBeInTheDocument();
  });

  it('onCloseModal should called when close the modal', () => {
    const handleCloseModal = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BasketModal onCloseModal={handleCloseModal} onOpenSuccessModal={jest.fn()} modalType={ModalType.AddCameraInBasket}/>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);

    expect(handleCloseModal).toBeCalled();
  });
});
