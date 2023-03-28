import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import MainPage from './main-page';

import { mockStore } from '../../utiles/mock';


describe('Component: MainPage', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MainPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    const spanElement = screen.getByText(/Новинка!/i);
    expect(spanElement).toBeInTheDocument();
  });
});
