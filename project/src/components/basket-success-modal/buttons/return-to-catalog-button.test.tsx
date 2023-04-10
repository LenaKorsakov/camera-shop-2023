import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ReturnToCatalogButton from './return-to-catalog-button';

import { mockStore } from '../../../utils/mock';

describe('Component: Return to catalog button', () => {
  const handleCloseModal = jest.fn();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ReturnToCatalogButton onCloseModal={handleCloseModal}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  });

  it('onCloseModal should called when click on the button', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ReturnToCatalogButton onCloseModal={handleCloseModal}/>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(handleCloseModal).toBeCalled();
  });
});
