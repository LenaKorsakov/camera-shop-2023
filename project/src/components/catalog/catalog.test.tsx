import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import Catalog from './catalog';

import {fakePromo, mockState, getMockStore, fakeCameras} from '../../utiles/mock';
import { NameSpace } from '../../const/name-space';
import { ContentPerItem } from '../../const/content-per-item';
import { FetchStatus } from '../../const/fetch-status';

const fakeStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    cameras: fakeCameras,
    catalogLoadingStatus: FetchStatus.Success,
    promoCamera: fakePromo
  }
});

const camerasQty = fakeCameras.length;

describe('Component: Catalog', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <Catalog/>
        </MemoryRouter>
      </Provider>
    );

    const cameraCardsQty = screen.getAllByTestId('card').length;
    expect(cameraCardsQty).toBe(ContentPerItem.Pagination);

    const paginationPagesQty = Math.ceil(camerasQty / ContentPerItem.Pagination);
    expect(screen.getAllByTestId('pagination').length).toBe(paginationPagesQty);
  });
});

