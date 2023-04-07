import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import SimilarCamerasBlock from './similar-cameras-block';

import { fakeCameras, mockStore} from '../../utils/mock';

describe('Component: Similar Cameras Block', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <SimilarCamerasBlock
            cameras={fakeCameras}
            onAddCameraInBasketButtonClick={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});
