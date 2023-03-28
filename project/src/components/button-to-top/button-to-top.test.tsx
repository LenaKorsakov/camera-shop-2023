import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ButtonToTop from './button-to-top';

import {fakePromo, mockState, getMockStore, fakeCameras} from '../../utiles/mock';
import { NameSpace } from '../../const/name-space';


const fakeStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    cameras: fakeCameras,
    promoCamera: fakePromo
  }
});

describe('Component: Button to top', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ButtonToTop/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).toHaveClass('up-btn');
  });
});
