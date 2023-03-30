import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import Banner from './banner';

import {fakePromo, mockState, getMockStore, fakeCameras} from '../../utils/mock';
import { NameSpace } from '../../const/name-space';
import { FetchStatus } from '../../const/fetch-status';

const fakeStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    cameras: fakeCameras,
    promoCamera: fakePromo,
    promoCameraFetchingStatus: FetchStatus.Success
  }
});

describe('Component: Banner', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <Banner/>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByAltText(fakePromo.name)).toBeInTheDocument();
    expect(screen.getByText(/Профессиональная камера/i)).toBeInTheDocument();
  });
});
