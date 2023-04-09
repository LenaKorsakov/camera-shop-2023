import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import SuccessModal from './success-modal';

import { fakeCamera, mockStore } from '../../../utils/mock';

const handleButtonClick = jest.fn();

describe('Component: Success Modal', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <SuccessModal cameraId={fakeCamera.id} onModalClose={handleButtonClick}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Вернуться к покупкам');
  });

  it('should call handler when user click on the link', async () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <SuccessModal cameraId={fakeCamera.id} onModalClose={handleButtonClick}/>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));
    expect(handleButtonClick).toBeCalled();
  });
});
