import { STAR_MAX } from '../../const/const';

type StarsRatingProps = {
  rating: number;
}

function StarsRating({ rating }: StarsRatingProps): JSX.Element {
  const stars = [];

  for(let i = 0; i < STAR_MAX; i++) {
    stars.push(
      <svg width={17} height={16} aria-hidden="true" data-testid="star" key={i}>
        <use xlinkHref={ i < rating ? '#icon-full-star' : '#icon-star'}/>
      </svg>);
  }

  return <div>{stars}</div> ;
}

export default StarsRating;
