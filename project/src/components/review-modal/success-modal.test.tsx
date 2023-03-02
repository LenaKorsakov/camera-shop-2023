import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCamera, mockStore } from '../../utiles/mock';
import userEvent from '@testing-library/user-event';
import SuccessModal from './success-modal';

const handleButtonClick = jest.fn();

describe('Component: SuccessModal', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <SuccessModal cameraId={fakeCamera.id} onButtonClick={handleButtonClick}/>
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
          <SuccessModal cameraId={fakeCamera.id} onButtonClick={handleButtonClick}/>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));
    expect(handleButtonClick).toBeCalled();
  });
});
