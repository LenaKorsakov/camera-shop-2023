import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import FooterItem from './footer-item';

import { FOOTER_ITEMS } from '../../../const/nav-items';
import { mockStore } from '../../../utils/mock';
import { NavItemsTitles } from '../../../const/nav-items';


describe('Component: Footer Item', () => {
  it('should render correctly', () => {
    const item = FOOTER_ITEMS[0];


    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <FooterItem navItem={item}/>
    );
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();

    expect(screen.getAllByRole('link')[0]).toHaveTextContent(NavItemsTitles.Catalog);
  });
});
