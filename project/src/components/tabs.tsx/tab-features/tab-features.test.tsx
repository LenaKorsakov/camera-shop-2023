import {render, screen} from '@testing-library/react';

import { fakeCamera } from '../../../utiles/mock';
import TabFeatures from './tab-features';

describe('Component: Feature Tab', () => {
  it('should render correctly', () => {
    render(
      <TabFeatures camera={fakeCamera} />
    );

    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });
});
