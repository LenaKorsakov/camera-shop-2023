import { Link } from 'react-router-dom';
import { memo } from 'react';

import { getCurrentParams } from '../../store/app-process/app-process-selectors';
import { useAppSelector } from '../../hooks';

import { AppRoute } from '../../const/app-route';

type PaginationItemProps = {
  pageNum: number;
  onPaginationItemClick: (page: number) => void;
  isActive: boolean;
}
function PaginationItem({ pageNum, onPaginationItemClick, isActive}: PaginationItemProps): JSX.Element {
  const currentPath = useAppSelector(getCurrentParams);

  return (
    <li className="pagination__item" data-testid="pagination">
      <Link
        className={`pagination__link ${isActive ? 'pagination__link--active' : ''}`}
        to={`${AppRoute.Catalog}${pageNum}?${currentPath}`}
        onClick={() => onPaginationItemClick(pageNum)}
      >
        {pageNum}
      </Link>
    </li>
  );
}

export default memo(PaginationItem);
