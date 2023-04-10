import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import BasketItemShort from './basket-item-short';

import { NameSpace } from '../../../const/name-space';
import { ModalType } from '../../../const/modal-type';
import { fakeCamera, getMockStore } from '../../../utils/mock';
import { formatPrice } from '../../../utils/format';

const store = getMockStore({
  [NameSpace.Order]: {
    selectedCamera: fakeCamera,
  }
});
describe('Component: Basket item short', () => {

  it('should render correctly when add camera in basket modal', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BasketItemShort camera = {fakeCamera} modalType={ModalType.AddCameraInBasket}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${formatPrice(fakeCamera.price)} ₽`)).toBeInTheDocument();
  });

  it('should render correctly when remove camera from basket modal', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BasketItemShort camera = {fakeCamera} modalType={ModalType.RemoveCameraFromBasket}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeCamera.vendorCode)).toBeInTheDocument();
    expect(screen.queryByText(`${formatPrice(fakeCamera.price)} ₽`)).not.toBeInTheDocument();
  });
});
