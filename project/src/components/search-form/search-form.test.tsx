import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import SearchForm from './search-form';

import { fakeCameras, getMockStore, mockState } from '../../utils/mock';
import { NameSpace } from '../../const/name-space';
import { FetchStatus } from '../../const/fetch-status';
import { WarningMessage } from '../../const/warning-message';

const loadingStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    searchCameras: [],
    searchedCamerasFetchingStatus: FetchStatus.Loading
  }
});

const successStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    searchCameras: fakeCameras,
    searchedCamerasFetchingStatus: FetchStatus.Success
  }
});

const errorStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    searchCameras: [],
    searchedCamerasFetchingStatus: FetchStatus.Error
  }
});

describe('Component: SearchForm', () => {
  it('should render correctly', () => {

    render(
      <Provider store={successStore}>
        <MemoryRouter>
          <SearchForm/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Сбросить поиск/i)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();

    const listItems = screen.getAllByTestId('list-item');
    expect(listItems.length).toEqual(fakeCameras.length);
  });

  it('should show loading when cameras is loading', () => {

    render(
      <Provider store={loadingStore}>
        <MemoryRouter>
          <SearchForm/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(WarningMessage.LoadingWarning)).toBeInTheDocument();
  });

  it('should show mistake when cameras did not load', () => {

    render(
      <Provider store={errorStore}>
        <MemoryRouter>
          <SearchForm/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(WarningMessage.DataLoadingWarning)).toBeInTheDocument();
  });
});
