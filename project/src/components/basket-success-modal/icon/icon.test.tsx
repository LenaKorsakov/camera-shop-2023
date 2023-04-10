import {render, screen} from '@testing-library/react';
import Icon from './icon';

describe('Component Icon', () => {
  it('should render correctly', () => {
    render (
      <Icon isOrderedSuccessful />
    );

    expect(screen.getByTestId('svg-success')).toBeInTheDocument();
    expect(screen.queryByTestId('svg-error')).not.toBeInTheDocument();
  });

  it('should render correctly when error', () => {
    render (
      <Icon isOrderedSuccessful={false} />
    );

    expect(screen.getByTestId('svg-error')).toBeInTheDocument();
    expect(screen.queryByTestId('svg-success')).not.toBeInTheDocument();
  });
});
