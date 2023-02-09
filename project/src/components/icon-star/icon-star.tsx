type IconStarProps = {
  isFull: boolean;
}
function IconStar({isFull}: IconStarProps): JSX.Element {
  return (
    <svg width={17} height={16} aria-hidden="true">
      <use xlinkHref={isFull ? '#icon-full-star' : '#icon-star'}/>
    </svg>
  );
}

export default IconStar;
