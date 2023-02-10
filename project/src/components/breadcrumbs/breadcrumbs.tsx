import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { BreadcrumbsNames } from '../../const/breadcrumbs-names';
import BreadcrumbsItem from './breadcrumbs-item';

type BreadcrumbsProps = {
  isActive: boolean;
  isProductPage: boolean;
  productName?: string;
}

function Breadcrumbs({ isActive, productName, isProductPage }: BreadcrumbsProps): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Main}>
              {BreadcrumbsNames.Main}
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          {isActive ?
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
            </li>
            : <BreadcrumbsItem isProductPage={isProductPage} productName={productName}/>}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
