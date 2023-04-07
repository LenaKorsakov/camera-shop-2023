import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ProductContent from './product-content';

import { fakeCamera, fakeCameras, getMockStore, mockState } from '../../utils/mock';
import { NameSpace } from '../../const/name-space';
import { FetchStatus } from '../../const/fetch-status';

const mockStateSuccess = getMockStore({
  ...mockState,
  [NameSpace.ProductData]: {
    camera: fakeCamera,
    fetchStatus: FetchStatus.Success,
    similarCameras: fakeCameras,
    reviews: []
  },
});

describe('Component: Product Content', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStateSuccess}>
        <MemoryRouter>
          <ProductContent camera={fakeCamera} onAddCameraInBasketButtonClick={jest.fn()}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('reviewBlock')).toBeInTheDocument();
  });
});
