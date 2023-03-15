import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import FormSearch from './form-search';

import { fakeCameras, getMockStore, mockState } from '../../utiles/mock';
import { NameSpace } from '../../const/name-space';
import { FetchStatus } from '../../const/fetch-status';
import { ErrorMessage } from '../../const/error-message';

const loadingStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    searchCameras: [],
    fetchingStatus: FetchStatus.Loading
  }
});

const successStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    searchCameras: fakeCameras,
    fetchingStatus: FetchStatus.Success
  }
});

const errorStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    searchCameras: [],
    fetchingStatus: FetchStatus.Error
  }
});

describe('Component: FormSearch', () => {
  it('should render correctly', () => {

    render(
      <Provider store={successStore}>
        <MemoryRouter>
          <FormSearch/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Сбросить поиск/i)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();

    const listItems = screen.getAllByTestId('list-item');
    expect(listItems.length).toEqual(fakeCameras.length);
  });

  it('should render loader when cameras is loading', () => {

    render(
      <Provider store={loadingStore}>
        <MemoryRouter>
          <FormSearch/>
        </MemoryRouter>
      </Provider>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('should show mistake when cameras did not load', () => {

    render(
      <Provider store={errorStore}>
        <MemoryRouter>
          <FormSearch/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(ErrorMessage.FetchingError)).toBeInTheDocument();
  });
});
