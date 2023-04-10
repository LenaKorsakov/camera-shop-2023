import {render, screen} from '@testing-library/react';
import IconCheckMark from './icon-check-mark';

describe('Component Icon check mark', () => {
  it('should render correctly', () => {
    render (
      <IconCheckMark/>
    );

    expect(screen.getByTestId('check-mark')).toBeInTheDocument();
  });
});
