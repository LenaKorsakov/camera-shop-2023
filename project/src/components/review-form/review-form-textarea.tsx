import { ChangeEvent } from 'react';

type ReiewTextareaProps = {
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    reviewText: string;
  }

function ReviewFormTextArea ({ onChange, reviewText }: ReiewTextareaProps): JSX.Element {
  // eslint-disable-next-line no-console
  console.log(reviewText);

  return(
    <div className="custom-textarea form-review__item">
      <label htmlFor="review">
        <span className="custom-textarea__label">
                  Комментарий
          <svg width={9} height={9} aria-hidden="true">
            <use xlinkHref="#icon-snowflake" />
          </svg>
        </span>
        <textarea
          id="review"
          name="review"
          minLength={5}
          placeholder="Поделитесь своим опытом покупки"
          value={reviewText}
          onChange={onChange}
        />
      </label>
      <div className="custom-textarea__error">
                Нужно добавить комментарий
      </div>
    </div>
  );
}
export default ReviewFormTextArea;
