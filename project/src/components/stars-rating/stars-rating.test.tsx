import { render, screen } from '@testing-library/react';

import StarsRating from './stars-rating';

import { STAR_MAX } from '../../const/const';
import { fakeCamera } from '../../utils/mock';

describe('Component: Stars Rating', () => {
  it('should render correctly', () => {

    render( <StarsRating rating={fakeCamera.rating}/>);

    expect(screen.getAllByTestId('star').length).toBe(STAR_MAX);
  });
});
