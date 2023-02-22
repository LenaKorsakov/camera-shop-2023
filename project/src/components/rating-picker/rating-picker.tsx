import RatingPickerItem from './rating-picker-item';

import { RATING_TITLES } from '../../const/rating-titles';

type RatingPickerProps = {
  rate: number;
}
function RatingPicker ({ rate }: RatingPickerProps): JSX.Element {

  return(
    <fieldset className="rate form-review__item">
      <legend className="rate__caption">
                Рейтинг
        <svg width={9} height={9} aria-hidden="true">
          <use xlinkHref="#icon-snowflake" />
        </svg>
      </legend>
      <div className="rate__bar">
        <div
          className="rate__group"
        >
          {RATING_TITLES.map(({rating, title}) => (
            <RatingPickerItem
              rating={rating}
              title={title}
              key={rating}
            />
          ))}
        </div>
        <div className="rate__progress">
          <span className="rate__stars">{rate}</span> <span>/</span>{' '}
          <span className="rate__all-stars">5</span>
        </div>
      </div>
      <p className="rate__message">Нужно оценить товар</p>
    </fieldset>
  );
}
export default RatingPicker;
