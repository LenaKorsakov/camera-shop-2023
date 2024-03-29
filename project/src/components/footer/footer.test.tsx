import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import Footer from './footer';

import { mockStore } from '../../utils/mock';

describe('Component: Footer', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Footer/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
  });
});
