import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCamera, mockStore } from '../../utiles/mock';
import CameraCard from './camera-card';

describe('Component: Camera card', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CameraCard
            isActive
            camera={fakeCamera}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Купить');
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
  });
});
