import { render, screen } from '@testing-library/react';
import { STAR_MAX } from '../../const/const';
import { fakeCamera } from '../../utiles/mock';
import StarsRating from './stars-rating';

describe('Component: Stars Rating', () => {
  it('should render correctly', () => {

    render( <StarsRating rating={fakeCamera.rating}/>);

    expect(screen.getAllByTestId('star').length).toBe(STAR_MAX);
  });
});
