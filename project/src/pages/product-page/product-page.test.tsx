import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ProductPage from './product-page';

import { mockStore } from '../../utiles/mock';

describe('Component: Product Page', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Страница не найдена/)).toBeInTheDocument();
    //тест отрабатывает корректно - ищет камеру по id в списке камер, не находит и выдает пустой экран
  });
});
