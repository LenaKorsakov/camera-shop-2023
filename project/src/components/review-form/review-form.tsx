import { ChangeEvent, FormEvent, useState } from 'react';

import RatingPicker from '../rating-picker/rating-picker';

import { ReviewPost } from '../../@types/review-types';
import { REVIEW_ITEM_ATRIBUTES } from '../../const/review-items-titles';
import ReviewFormInput from './review-form-input';
import ReviewFormTextArea from './review-form-textarea';
import { useAppDispatch } from '../../hooks';
import { fetchReviewAction, sendReviewAction } from '../../store/api-actions';

const INITIAL_FORM_DATA = {
  userName: '',
  advantage: '',
  disadvantage: '',
  review: '',
  rating: 0,
  cameraId: 0,
};

type ReviewFormProps = {
  cameraId: number;
}

function ReviewForm ({cameraId}: ReviewFormProps): JSX.Element {
  const [formData, setFormData] = useState<ReviewPost>(INITIAL_FORM_DATA);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: name === 'rating' ? +value : value
    });
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    // eslint-disable-next-line no-console
    console.log(value);

    setFormData({
      ...formData,
      review: value
    });
  };

  // eslint-disable-next-line no-console
  console.log(formData);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(sendReviewAction({
      ...formData,
      cameraId: cameraId
    })).unwrap().then(
      () => {
        dispatch(fetchReviewAction(cameraId));
        setFormData(INITIAL_FORM_DATA);
      },
      () => {
        throw new Error('oшибка');
      });
  };

  return(
    <form
      method="post"
      onSubmit={handleFormSubmit}
    >
      <div className="form-review__rate" onChange={handleInputChange}>
        <RatingPicker
          rate={formData.rating}
        />
        {REVIEW_ITEM_ATRIBUTES.map((item) => (
          <ReviewFormInput
            name={item.name}
            title={item.title}
            placeholder={item.placeholder}
            errorText={item.errorText}
            key={item.name}
          />
        ))}
        <ReviewFormTextArea
          onChange={handleTextAreaChange}
          reviewText={formData.review}
        />
      </div>
      <button className="btn btn--purple form-review__btn" type="submit">
            Отправить отзыв
      </button>
    </form>
  );
}
export default ReviewForm;
