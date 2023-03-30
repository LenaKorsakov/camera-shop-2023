import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ReviewItem from './review-item';

import { fakeReviewAdapt, mockStore } from '../../../utils/mock';


describe('Component: Review Item', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ReviewItem
            reviewData={fakeReviewAdapt}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки:/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();
  });
});
