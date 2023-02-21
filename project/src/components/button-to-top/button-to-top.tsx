function ButtonToTop(): JSX.Element {
  const handleButtonToTopClick = () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  return (
    <button
      className="up-btn"
      onClick={handleButtonToTopClick}
    >
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </button>
  );
}

export default ButtonToTop;
