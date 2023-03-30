import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ReviewBlock from './review-block';

import { fakeCamera, fakeReviews, getMockStore, mockState} from '../../utils/mock';
import { NameSpace } from '../../const/name-space';

const fakeStore = getMockStore({...mockState,
  [NameSpace.ProductData]: {
    reviews: fakeReviews,
  }
});

describe('Component: Review Block', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore }>
        <MemoryRouter>
          <ReviewBlock cameraId={fakeCamera.id} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    const buttonElement = screen.getByText(/Оставить свой отзыв/i);
    expect(buttonElement).toBeInTheDocument();
  });

});
