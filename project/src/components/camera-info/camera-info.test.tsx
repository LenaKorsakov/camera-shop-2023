import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCamera, mockStore } from '../../utiles/mock';
import CameraInfo from './camera-info';

describe('Component: Camera Info', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CameraInfo
            camera={fakeCamera}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
    expect(screen.getByAltText(fakeCamera.name)).toBeInTheDocument();
  });
});
