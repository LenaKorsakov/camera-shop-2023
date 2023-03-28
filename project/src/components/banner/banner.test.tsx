import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import Banner from './banner';

import {fakePromo, mockState, getMockStore, fakeCameras} from '../../utiles/mock';
import { NameSpace } from '../../const/name-space';

const fakeStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    cameras: fakeCameras,
    promoCamera: fakePromo
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
