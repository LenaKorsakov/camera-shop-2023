import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import BasketPage from './basket-page';

import { fakeCameras, getMockStore, mockStore} from '../../utils/mock';
import { NameSpace } from '../../const/name-space';

const store = getMockStore({
  [NameSpace.Order]: {
    camerasInBasket: fakeCameras
  }
});

describe('Component: Basket Page', () => {

  it('should render correctly when empty basket', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/В данный момент корзина пуста/i)).toBeInTheDocument();
  });

  it('should render correctly when there are cameras in the basket', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BasketPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('basket item')).toHaveLength(fakeCameras.length);
  });
});
