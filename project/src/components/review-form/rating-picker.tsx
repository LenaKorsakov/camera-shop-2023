import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Fragment } from 'react';

import { RATING_TITLES } from '../../const/rating-titles';
import { InputErrorText, InputTitle } from '../../const/review-inputs';


type RatingPickerProps = {
  rate: number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  disabled: boolean;
}

function RatingPicker ({ rate, register, errors, disabled }: RatingPickerProps): JSX.Element {

  return(
    <fieldset className={`rate form-review__item ${errors.rating ? 'is-invalid' : ''}`}>
      <legend className="rate__caption">
        {InputTitle.Rating}
        <svg width={9} height={9} aria-hidden="true">
          <use xlinkHref="#icon-snowflake" />
        </svg>
      </legend>
      <div className="rate__bar">
        <div
          className="rate__group"
        >
          {RATING_TITLES.map(({rating, title}) => (
            <Fragment key={rating}>
              <input
                className="visually-hidden"
                id={`star-${rating}`}
                type="radio"
                value={rating}
                {...register('rating', { required: true})}
                disabled={disabled}
              />
              <label
                className="rate__label"
                htmlFor={`star-${rating}`}
                title={title}
              />
            </Fragment>
          ))}
        </div>
        <div className="rate__progress">
          <span className="rate__stars">{rate}</span> <span>/</span>{' '}
          <span className="rate__all-stars">5</span>
        </div>
      </div>
      <p className="rate__message">{InputErrorText.Rate}</p>
    </fieldset>
  );
}
export default RatingPicker;
