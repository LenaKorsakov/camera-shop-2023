import { ChangeEvent } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { InputErrorText, InputName, InputPlaceholder, InputTitle, REVIEW_MIN_LENGTH } from '../../const/review-inputs';

type ReiewTextareaProps = {
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    disabled: boolean;
  }

function ReviewFormTextArea ({ onChange, register, errors, disabled }: ReiewTextareaProps): JSX.Element {

  return(
    <div className={`custom-textarea form-review__item ${errors.review ? 'is-invalid' : ''}`}>
      <label htmlFor={InputName.Review}>
        <span className="custom-textarea__label">
          {InputTitle.Review}
          <svg width={9} height={9} aria-hidden="true">
            <use xlinkHref="#icon-snowflake" />
          </svg>
        </span>
        <textarea
          id={InputName.Review}
          disabled={disabled}
          placeholder={InputPlaceholder.Review}
          {...register(InputName.Review, {
            required: InputErrorText.Review,
            minLength: {
              value: REVIEW_MIN_LENGTH,
              message: InputErrorText.ReviewLength
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
