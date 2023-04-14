import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import { fakeCamera, getMockStore} from '../../utils/mock';
import { ModalType } from '../../const/modal-type';
import { NameSpace } from '../../const/name-space';
import BasketInfoModal from './basket-info-modal';

const store = getMockStore({
  [NameSpace.Order]: {
    selectedCamera: fakeCamera,
  }
});

describe('Component: Basket Info Modal', () => {
  const handleCloseModal = jest.fn();

  it('should render correctly add camera in basket modal', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BasketInfoModal onCloseModal={handleCloseModal} modalType={ModalType.AddCameraInBasket}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('success-modal')).toBeInTheDocument();
  });

  it('onCloseModal should called when close the modal', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BasketInfoModal onCloseModal={handleCloseModal} modalType={ModalType.AddCameraInBasket}/>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);

    expect(handleCloseModal).toBeCalled();
  });
});
