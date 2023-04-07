import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import CameraCard from './camera-card';

import { fakeCamera, mockStore } from '../../utils/mock';

describe('Component: Camera card', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CameraCard
            isActive
            camera={fakeCamera}
            onAddCameraInBasketButtonClick={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Купить');
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
  });
});
