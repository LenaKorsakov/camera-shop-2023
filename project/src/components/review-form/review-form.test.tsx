import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {Provider} from 'react-redux';

import { fakeCamera, mockStore } from '../../utiles/mock';
import ReviewForm from './review-form';
import { InputPlaceholder } from '../../const/review-inputs';

describe('Component: Review Form', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ReviewForm cameraId={fakeCamera.id}/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('button')).toHaveTextContent(/Отправить отзыв/i);
    expect(screen.getByTestId('review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(InputPlaceholder.Disadvantage)).toBeInTheDocument();
  });
});
