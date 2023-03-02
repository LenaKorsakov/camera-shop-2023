import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import {fakePromo, mockState, getMockStore, fakeCameras} from '../../utiles/mock';
import { NameSpace } from '../../const/name-space';
import Catalog from './catalog';
import { CONTENT_PAR_PAGE } from '../../const/const';

const fakeStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    cameras: fakeCameras,
    isLoading: false,
    promo: fakePromo
  }
});

const camerasQty = fakeCameras.length;

describe('Component: Catalog', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <Catalog
            cameras={fakeCameras}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();

    const cameraCardsQty = screen.getAllByTestId('card').length;
    expect(cameraCardsQty).toBe(CONTENT_PAR_PAGE);

    const paginationPagesQty = Math.ceil(camerasQty / CONTENT_PAR_PAGE);
    expect(screen.getAllByTestId('pagination').length).toBe(paginationPagesQty);
  });
});

