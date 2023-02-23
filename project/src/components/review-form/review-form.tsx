import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import RatingPicker from '../rating-picker/rating-picker';
import ReviewFormTextArea from './review-form-textarea';
import ReviewFormInput from './review-form-input';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewAction, sendReviewAction } from '../../store/api-actions';
import { displayError } from '../../store/actions';

import { REVIEW_ITEM_ATRIBUTES } from '../../const/review-items-titles';
import { WarningMessage } from '../../const/warning-message';

import { ReviewPost } from '../../@types/review-types';
import { getReviewLoadingStatus } from '../../store/product-process/product-data-selectors';

type ReviewFormProps = {
  cameraId: number;
}

const INITIAL_FORM_DATA = {
  userName: '',
  advantage: '',
  disadvantage: '',
  review: '',
  rating: 0,
  cameraId: 0,
};

function ReviewForm ({cameraId}: ReviewFormProps): JSX.Element {
  const [formData, setFormData] = useState<ReviewPost>(INITIAL_FORM_DATA);

  const {
    register,
    trigger,
    formState: { errors, isValid },
    reset
  } = useForm({mode: 'onBlur'});


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: name === 'rating' ? +value : value
    });
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    setFormData({
      ...formData,
      review: value
    });
  };

  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    trigger();
    if (! isValid) {
      return;
    }

    dispatch(sendReviewAction({
      ...formData,
      cameraId: cameraId
    })).unwrap().then(
      () => {
        dispatch(fetchReviewAction(cameraId));

        reset();
        setFormData(INITIAL_FORM_DATA);
      },
      () => dispatch(displayError(WarningMessage.SendingError)));
  };

  const isReviewSending = useAppSelector(getReviewLoadingStatus);

  return(
    <>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form
          method="post"
          onSubmit={handleFormSubmit}
        >
          <div className="form-review__rate" onChange={handleInputChange}>
            <RatingPicker
              rate={formData.rating}
              register={register}
              errors={errors}
              disabled={isReviewSending}
            />
            {REVIEW_ITEM_ATRIBUTES.map((item) => (
              <ReviewFormInput
                name={item.name}
                title={item.title}
                placeholder={item.placeholder}
                errorText={item.errorText}
                register={register}
                errors={errors}
                key={item.name}
                disabled={isReviewSending}
              />
            ))}
            <ReviewFormTextArea
              register={register}
              errors={errors}
              onChange={handleTextAreaChange}
              disabled={isReviewSending}
            />
          </div>
          <button
            className="btn btn--purple form-review__btn"
            type="submit"
            disabled={isReviewSending}
          >
            Отправить отзыв
          </button>
        </form>
      </div>
    </>
  );
}
export default ReviewForm;
