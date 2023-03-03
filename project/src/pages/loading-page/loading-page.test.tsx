import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import LoadingPage from './loading-page';

import { fakeCameras, getMockStore, mockState } from '../../utiles/mock';
import { NameSpace } from '../../const/name-space';

const loadingStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    cameras: fakeCameras,
    isLoading: true
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
