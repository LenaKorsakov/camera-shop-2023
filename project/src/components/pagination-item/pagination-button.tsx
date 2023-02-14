import { Link } from 'react-router-dom';
import { PaginationButtonName } from '../../const/pagination-buttons-name';

type PaginationItemProps = {
  name: PaginationButtonName;
  onPaginationButtonClick: () => void;
  linkProp: string;
}

function PaginationButton({ name, onPaginationButtonClick, linkProp}: PaginationItemProps): JSX.Element {
  const handlePaginationButtonClick = () => onPaginationButtonClick();

  return (
    <li className="pagination__item">
      <Link
        className="pagination__link pagination__link--text"
        to={linkProp}
        onClick={handlePaginationButtonClick}
      >
        {name}
      </Link>
    </li>
  );
}

export default PaginationButton;

