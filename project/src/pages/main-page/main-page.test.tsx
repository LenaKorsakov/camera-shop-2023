import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCameras, getMockStore, mockState, mockStore } from '../../utiles/mock';
import MainPage from './main-page';
import { NameSpace } from '../../const/name-space';

const loadingStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    cameras: fakeCameras,
    isLoading: true
  }
});

describe('Component: MainPage', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MainPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    const spanElement = screen.getByText(/Новинка!/i);
    expect(spanElement).toBeInTheDocument();
  });

  it('should render loader when cameras is loading', () => {

    render(
      <Provider store={loadingStore}>
        <MemoryRouter>
          <MainPage/>
        </MemoryRouter>
      </Provider>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
