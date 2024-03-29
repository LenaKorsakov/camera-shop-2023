import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import LoadingPage from './loading-page';

import { fakeCameras, getMockStore, mockState } from '../../utils/mock';
import { NameSpace } from '../../const/name-space';
import { FetchStatus } from '../../const/fetch-status';

const loadingStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    cameras: fakeCameras,
    catalogLoadingStatus: FetchStatus.Loading
  }
});

describe('Component: Loading Page', () => {
  it('should render correctly', () => {

    render(
      <Provider store={loadingStore}>
        <MemoryRouter>
          <LoadingPage/>
        </MemoryRouter>
      </Provider>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
