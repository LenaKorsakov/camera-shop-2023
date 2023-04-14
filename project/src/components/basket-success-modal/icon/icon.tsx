type IconProps = {
  isOrderedSuccessful: boolean;
}

const Icon = ({isOrderedSuccessful}: IconProps): JSX.Element => (
  <svg
    className="modal__icon"
    height="78"
    aria-hidden="true"
  >
    {isOrderedSuccessful ? <use data-testid='svg-success' xlinkHref="#icon-review-success"></use> : <use xlinkHref="#icon-close" data-testid='svg-error'></use>}
  </svg>
);

export default Icon;
