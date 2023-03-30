import {render, screen} from '@testing-library/react';

import TabFeatures from './tab-features';

import { fakeCamera } from '../../../utils/mock';

describe('Component: Feature Tab', () => {
  it('should render correctly', () => {
    render(
      <TabFeatures camera={fakeCamera} />
    );

    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });
});
