import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { BreadcrumbsNames } from '../../const/breadcrumbs-names';

type BreadcrumbsItemProps = {
  isProductPage: boolean;
  productName?: string;
}

function BreadcrumbsItem({ productName, isProductPage}: BreadcrumbsItemProps): JSX.Element {
  return (
    <>
      <li className="breadcrumbs__item">
        <Link className="breadcrumbs__link" to={AppRoute.Main}>
          {BreadcrumbsNames.Catalog}
          <svg width={5} height={8} aria-hidden="true">
            <use xlinkHref="#icon-arrow-mini" />
          </svg>
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <span className="breadcrumbs__link breadcrumbs__link--active">
          {isProductPage ? productName : BreadcrumbsNames.Basket}
        </span>
      </li>
    </>

  );
}

export default BreadcrumbsItem;
