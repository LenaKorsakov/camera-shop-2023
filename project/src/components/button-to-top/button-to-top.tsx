function ButtonToTop(): JSX.Element {
  const handleButtonToTopClick = () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });

  return (
    <a
      className="up-btn"
      href="#header"
      onClick={handleButtonToTopClick}
    >
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </a>
  );
}

export default ButtonToTop;
