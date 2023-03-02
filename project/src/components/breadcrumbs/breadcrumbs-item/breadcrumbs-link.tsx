import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const/app-route';
import { BreadcrumbsNames } from '../../../const/breadcrumbs-names';

type BreadcrumbsLinkProps = {
  route: AppRoute;
  title: BreadcrumbsNames;
}

function BreadcrumbsLink({ route, title }: BreadcrumbsLinkProps): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <Link className="breadcrumbs__link" to={route}>
        {title}
        <svg width={5} height={8} aria-hidden="true">
          <use xlinkHref="#icon-arrow-mini" />
        </svg>
      </Link>
    </li>
  );
}

export default BreadcrumbsLink;
