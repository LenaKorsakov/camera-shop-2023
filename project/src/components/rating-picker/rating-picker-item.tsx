
type RatingPickerProps = {
  rating: number;
  title: string;
  // isDisabled: boolean;
  // isChecked: boolean;
}

function RatingPickerItem ({ rating, title }: RatingPickerProps): JSX.Element {

  return(
    <>
      <input
        className="visually-hidden"
        id={`star-${rating}`}
        name="rating"
        type="radio"
        value={rating}
        // disabled={isDisabled}
        // checked={isChecked}
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
