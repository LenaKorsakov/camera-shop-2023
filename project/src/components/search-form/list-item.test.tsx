import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ListItem from './list-item';

import { fakeCameras, getMockStore, mockState } from '../../utils/mock';
import { NameSpace } from '../../const/name-space';
import { FetchStatus } from '../../const/fetch-status';

const successStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    searchCameras: fakeCameras,
    searchedCamerasFetchingStatus: FetchStatus.Success
  }
});

describe('Component: List Item', () => {
  it('should render correctly', () => {

    render(
      <Provider store={successStore}>
        <MemoryRouter>
          <ListItem item={fakeCameras[0]} isFocused={false} onNavigateToCurrentProductPage={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem ).toBeInTheDocument();
  });
});
