import { FieldValues, UseFormRegister } from 'react-hook-form';

type RatingPickerProps = {
  rating: number;
  title: string;
  register: UseFormRegister<FieldValues>;
  // isDisabled: boolean;
}

function RatingPickerItem ({ rating, title, register }: RatingPickerProps): JSX.Element {

  return(
    <>
      <input
        className="visually-hidden"
        id={`star-${rating}`}
        type="radio"
        value={rating}
        {...register('rating', { required: true})}
        // disabled={isDisabled}
      />
      <label
        className="rate__label"
        htmlFor={`star-${rating}`}
        title={title}
      />
    </>

  );
}
export default RatingPickerItem;
