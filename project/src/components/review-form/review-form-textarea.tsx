import { ChangeEvent } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { REVIEW_MIN_LENGTH, ValidationText } from '../../const/validation-text';

type ReiewTextareaProps = {
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
  }

function ReviewFormTextArea ({ onChange, register, errors }: ReiewTextareaProps): JSX.Element {

  return(
    <div className={`custom-textarea form-review__item ${errors.review ? 'is-invalid' : ''}`}>
      <label htmlFor="review">
        <span className="custom-textarea__label">
                  Комментарий
          <svg width={9} height={9} aria-hidden="true">
            <use xlinkHref="#icon-snowflake" />
          </svg>
        </span>
        <textarea
          id="review"
          placeholder="Поделитесь своим опытом покупки"
          {...register('review', {
            required: ValidationText.ValidateReview,
            minLength: {
              value: REVIEW_MIN_LENGTH,
              message: ValidationText.ValidateReviewLength
            },
            onChange: onChange
          })}
        />
      </label>
      <div className="custom-textarea__error">
        {errors.review?.message?.toString()}
      </div>
    </div>
  );
}
export default ReviewFormTextArea;
