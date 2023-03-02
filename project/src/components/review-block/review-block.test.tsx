import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCamera, fakeReviews, getMockStore, mockState, mockStore } from '../../utiles/mock';
import { NameSpace } from '../../const/name-space';
import ReviewBlock from './review-block';

const loadingStore = getMockStore({...mockState,
  [NameSpace.ReviewData]: {
    reviews: fakeReviews,
    isLoading: true
  }
});

describe('Component: Review Block', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ReviewBlock cameraId={fakeCamera.id} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    const buttonElement = screen.getByText(/Оставить свой отзыв/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('should render loader when reviews is loading', () => {

    render(
      <Provider store={loadingStore}>
        <MemoryRouter>
          <ReviewBlock cameraId={fakeCamera.id} />
        </MemoryRouter>
      </Provider>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
