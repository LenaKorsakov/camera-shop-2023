import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import Catalog from './catalog';

import {fakePromo, mockState, getMockStore, fakeCameras} from '../../utils/mock';
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

const camerasAmount = fakeCameras.length;

describe('Component: Catalog', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <Catalog onAddCameraInBasketClickButton={jest.fn()}/>
        </MemoryRouter>
      </Provider>
    );

    const cameraCardsAmount = screen.getAllByTestId('card').length;
    expect(cameraCardsAmount).toBe(ContentPerItem.Pagination);

    const paginationPagesAmount = Math.ceil(camerasAmount / ContentPerItem.Pagination);
    expect(screen.getAllByTestId('pagination').length).toBe(paginationPagesAmount);
  });
});

