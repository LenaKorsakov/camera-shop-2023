import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type ReviewFormInputProps = {
  name: string;
  title: string;
  placeholder: string;
  errorText: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}
function ReviewFormInput ({ name, title, placeholder, errorText, register, errors }: ReviewFormInputProps): JSX.Element {

  return(
    <div className={`custom-input form-review__item ${errors[name] ? 'is-invalid' : ''}`}>
      <label>
        <span className="custom-input__label">
          {title}
          <svg width={9} height={9} aria-hidden="true">
            <use xlinkHref="#icon-snowflake" />
          </svg>
        </span>
        <input
          type="text"
          placeholder={placeholder}
          autoComplete={'off'}
          {...register(`${name}`, {required: true})}
        />
      </label>
      <p className="custom-input__error">{errorText}</p>
    </div>
  );
}
export default ReviewFormInput;
