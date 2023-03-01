import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import {fakePromo, mockState, getMockStore, fakeCameras} from '../../utiles/mock';
import Banner from './banner';
import { NameSpace } from '../../const/name-space';
//import { createMemoryHistory } from 'history';
// import HistoryRoute from '../history-route/history-route';
// import { AppRoute } from '../../const/app-route';
// import userEvent from '@testing-library/user-event';
// import { ComponentName } from '../../const/component-name';
// import { DEFAULT_TABS_TYPE } from '../../const/tabs-buttons';

const fakeStore = getMockStore({...mockState,
  [NameSpace.CatalogData]: {
    cameras: fakeCameras,
    isLoading: false,
    promo: fakePromo
  }
});

// const history = createMemoryHistory();

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
  // it('should redirect to the product page when user click on the link', async () => {
  //   history.push('/banner');

  //   render(
  //     <Provider store={fakeStore}>
  //       <HistoryRoute history={history}>
  //         <Routes>
  //           <Route
  //             path='/banner'
  //             element={<Banner />}
  //           />
  //           <Route
  //             path={`${AppRoute.Product}/${fakePromo.id}?${ComponentName.Tab}=${DEFAULT_TABS_TYPE}`}
  //             element={<h1>Product screen!</h1>}
  //           />
  //         </Routes>
  //       </HistoryRoute>
  //     </Provider>
  //   );

  //   await userEvent.click(screen.getByTestId('link'));
  //   expect(screen.getByText(/Product screen!/i)).toBeInTheDocument();
  // });
});
