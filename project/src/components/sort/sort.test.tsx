import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';


import { getMockStore, mockState } from '../../utiles/mock';
import { NameSpace } from '../../const/name-space';
import { ServerOrderValue } from '../../const/sort-order';
import { ServerTypeValue } from '../../const/sort-type';
import Sort from './sort';

const mockStore = getMockStore({...mockState,
  [NameSpace.Sort]: {
    currentSortOrder: ServerOrderValue.OrderUp,
    currentSortType: ServerTypeValue.Popular
  }
});

describe('Component: Sort', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Sort />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/по популярности/i)).toBeInTheDocument();
  });
});
