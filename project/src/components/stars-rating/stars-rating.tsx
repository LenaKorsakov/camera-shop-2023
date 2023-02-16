import { STAR_MAX } from '../../const/const';
import IconStar from '../icon-star/icon-star';

type StarsRatingProps = {
  rating: number;
}

function StarsRating({ rating }: StarsRatingProps): JSX.Element {
  const stars = [];
  for(let i = 0; i < STAR_MAX; i++) {
    stars.push(
      <IconStar
        isFull={i < rating}
        key={i}
      />);
  }

  return <div>{stars}</div> ;
}

export default StarsRating;
