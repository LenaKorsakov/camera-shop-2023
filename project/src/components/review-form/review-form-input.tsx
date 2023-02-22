type ReviewFormInputProps = {
  name: string;
  title: string;
  placeholder: string;
  errorText: string;
}
function ReviewFormInput ({ name, title, placeholder, errorText}: ReviewFormInputProps): JSX.Element {

  return(
    <div className="custom-input form-review__item">
      <label>
        <span className="custom-input__label">
          {title}
          <svg width={9} height={9} aria-hidden="true">
            <use xlinkHref="#icon-snowflake" />
          </svg>
        </span>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          required
        />
      </label>
      <p className="custom-input__error">{errorText}</p>
    </div>
  );
}
export default ReviewFormInput;
