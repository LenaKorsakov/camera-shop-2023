import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';


import { getMockStore, mockState } from '../../utils/mock';
import { NameSpace } from '../../const/name-space';
import { SortByOrderServerValue } from '../../const/sort-by-order';
import { SortByTypeServerValue } from '../../const/sort-by-type';
import Sort from './sort';

const mockStore = getMockStore({...mockState,
  [NameSpace.Sort]: {
    currentSortOrder: SortByOrderServerValue.OrderUp,
    currentSortType: SortByTypeServerValue.Popular
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
