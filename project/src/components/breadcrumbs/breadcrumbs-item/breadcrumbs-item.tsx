import BreadcrumbsLink from './breadcrumbs-link';

import { AppRoute } from '../../../const/app-route';
import { BreadcrumbsName } from '../../../const/breadcrumbs-name';
import BreadcrumbsActiveItem from './breadscrumbs-active-item';

type BreadcrumbsItemProps = {
  isProductPage: boolean;
  productName?: string;
}

function BreadcrumbsItem({ productName, isProductPage}: BreadcrumbsItemProps): JSX.Element {
  return (
    <>
      <BreadcrumbsLink
        route={AppRoute.Main}
        title={BreadcrumbsName.Catalog}
      />
      <BreadcrumbsActiveItem
        title={isProductPage ? productName : BreadcrumbsName.Basket}
      />
    </>

  );
}

export default BreadcrumbsItem;
