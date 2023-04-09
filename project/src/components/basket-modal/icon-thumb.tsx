type IconThumbProps = {
  isSuccess: boolean;
}

const IconThumb = ({isSuccess}: IconThumbProps): JSX.Element => (
  <svg
    className={`modal__icon ${!isSuccess ? 'rotate' : ''}`}
    width="80"
    height="78"
    aria-hidden="true"
  >
    {isSuccess ? <use xlinkHref="#icon-review-success"></use> : <use xlinkHref="#icon-review-error"></use>}
  </svg>
);

export default IconThumb;
