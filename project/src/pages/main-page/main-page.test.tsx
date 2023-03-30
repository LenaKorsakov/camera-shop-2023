import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import MainPage from './main-page';

import { fakeCameras, fakePromo, getMockStore, mockState } from '../../utils/mock';
import { NameSpace } from '../../const/name-space';
import { FetchStatus } from '../../const/fetch-status';

const fakeStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    cameras: fakeCameras,
    promoCamera: fakePromo,
    promoCameraFetchingStatus: FetchStatus.Success
  }
});

describe('Component: MainPage', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <MainPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    const spanElement = screen.getByText(/Новинка!/i);
    expect(spanElement).toBeInTheDocument();
  });
});
