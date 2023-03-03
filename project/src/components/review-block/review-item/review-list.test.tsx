import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ReviewsList from './review-list';
import { fakeCamera, fakeReviewsAdapt, mockStore } from '../../../utiles/mock';


describe('Component: Review List', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ReviewsList
            reviews={fakeReviewsAdapt}
            cameraId={fakeCamera.id}
          />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Показать больше отзывов');
  });

  it('should hide button if the number of reviews no more than 3', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ReviewsList
            reviews={fakeReviewsAdapt.slice(0, 1)}
            cameraId={fakeCamera.id}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
