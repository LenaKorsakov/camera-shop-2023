import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import EmptyPage from './empty-page';

import { mockStore } from '../../utils/mock';
import { WarningMessage } from '../../const/warning-message';


describe('Component: EmptyPage', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <EmptyPage message={WarningMessage.NoProductsMatchingThisFilterWarning}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/По данным фильтрам продуктов не найдено./)).toBeInTheDocument();
  });
});
