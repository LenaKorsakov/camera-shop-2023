import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCamera, mockStore } from '../../utiles/mock';
import CameraRating from './camera-rating';

describe('Component: Camera Rating', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CameraRating
            rating={fakeCamera.rating}
            reviewCount={fakeCamera.reviewCount}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${'Рейтинг:'} ${fakeCamera.rating}`))).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
  });
});
