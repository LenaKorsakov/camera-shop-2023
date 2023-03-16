import { Link, useSearchParams } from 'react-router-dom';
import { memo } from 'react';

import { AppRoute } from '../../const/app-route';

type PaginationItemProps = {
  pageNum: number;
  onPaginationItemClick: (page: number) => void;
  isActive: boolean;
}
function PaginationItem({ pageNum, onPaginationItemClick, isActive}: PaginationItemProps): JSX.Element {
  const [searchParams] = useSearchParams();
  return (
    <li className="pagination__item" data-testid="pagination">
      <Link
        className={`pagination__link ${isActive ? 'pagination__link--active' : ''}`}
        to={`${AppRoute.Catalog}${pageNum}?${searchParams.toString()}`}
        onClick={() => onPaginationItemClick(pageNum)}
      >
        {pageNum}
      </Link>
    </li>
  );
}

export default memo(PaginationItem);
