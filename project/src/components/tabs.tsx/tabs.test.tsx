import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import Tabs from './tabs';
import { fakeCamera } from '../../utiles/mock';

describe('Component: Tabs', () => {
  it ('should render correctly', () => {
    render (
      <MemoryRouter>
        <Tabs camera={fakeCamera} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();

    expect(screen.getByText(fakeCamera.description)).toBeInTheDocument();
  });
});
