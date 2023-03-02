import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCamera, mockStore} from '../../utiles/mock';
import Breadcrumbs from './breadcrumbs';

describe('Component: Breadcrumbs', () => {
  it('should render correctly on catalog page', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Breadcrumbs
            isCatalogActive
            isProductPage={false}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list.childNodes.length).toBe(2);
  });
  it('should render correctly on basket page', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Breadcrumbs
            isCatalogActive={false}
            isProductPage={false}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Корзина/i)).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list.childNodes.length).toBe(3);
  });

  it('should render correctly on product page', () => {
    const productName = fakeCamera.name;

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Breadcrumbs
            isCatalogActive={false}
            isProductPage
            productName={productName}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(productName)).toBeInTheDocument();
    expect(screen.queryByText(/Корзина/i)).not.toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list.childNodes.length).toBe(3);
  });

});
