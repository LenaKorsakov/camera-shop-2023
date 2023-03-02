import {render, screen} from '@testing-library/react';
import { fakeCamera } from '../../../utiles/mock';

import TabDescription from './tab-description';

describe('Component: Description Tab', () => {
  it('should render correctly', () => {
    render (
      <TabDescription description={fakeCamera.description}/>
    );

    expect(screen.getByText(fakeCamera.description)).toBeInTheDocument();
  });
});
