function Pagination(): JSX.Element {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <a
            className="pagination__link pagination__link--active"
            href="//TODO"
          >
      1
          </a>
        </li>
        <li className="pagination__item">
          <a className="pagination__link" href="//TODO">
      2
          </a>
        </li>
        <li className="pagination__item">
          <a className="pagination__link" href="//TODO">
      3
          </a>
        </li>
        <li className="pagination__item">
          <a
            className="pagination__link pagination__link--text"
            href="//TODO"
          >
      Далее
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
