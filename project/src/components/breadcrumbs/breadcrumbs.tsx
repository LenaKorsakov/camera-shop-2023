import { memo } from 'react';
import { AppRoute } from '../../const/app-route';
import { BreadcrumbsName } from '../../const/breadcrumbs-name';
import BreadcrumbsItem from './breadcrumbs-item/breadcrumbs-item';
import BreadcrumbsLink from './breadcrumbs-item/breadcrumbs-link';
import BreadcrumbsActiveItem from './breadcrumbs-item/breadscrumbs-active-item';

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
            title={BreadcrumbsName.Main}
          />
          {isCatalogActive ? <BreadcrumbsActiveItem title={BreadcrumbsName.Catalog}/>
            : <BreadcrumbsItem isProductPage={isProductPage} productName={productName}/>}
        </ul>
      </div>
    </div>
  );
}

export default memo(Breadcrumbs);
