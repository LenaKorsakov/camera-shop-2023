import { memo } from 'react';
import { AppRoute } from '../../const/app-route';
import { BreadcrumbsNames } from '../../const/breadcrumbs-names';
import BreadcrumbsItem from './breadcrumbs-item';
import BreadcrumbsLink from './breadcrumbs-link';
import BreadcrumbsActiveItem from './breadscrumbs-active-item';

type BreadcrumbsProps = {
  isCatalogActive: boolean;
  isProductPage: boolean;
  productName?: string;
}

function Breadcrumbs({ isCatalogActive, productName, isProductPage }: BreadcrumbsProps): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <BreadcrumbsLink
            route={AppRoute.Main}
            title={BreadcrumbsNames.Main}
          />
          {isCatalogActive ? <BreadcrumbsActiveItem title={BreadcrumbsNames.Catalog}/>
            : <BreadcrumbsItem isProductPage={isProductPage} productName={productName}/>}
        </ul>
      </div>
    </div>
  );
}

export default memo(Breadcrumbs);
