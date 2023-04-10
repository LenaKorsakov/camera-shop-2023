type IconProps = {
  isOrderedSuccessful: boolean;
}

const Icon = ({isOrderedSuccessful}: IconProps): JSX.Element => (
  <svg
    className={`modal__icon ${!isOrderedSuccessful ? 'rotate' : ''}`}
    width="80"
    height="78"
    aria-hidden="true"
  >
    {isOrderedSuccessful ? <use xlinkHref="#icon-review-success"></use> : <use xlinkHref="#icon-review-error"></use>}
  </svg>
);

export default Icon;
