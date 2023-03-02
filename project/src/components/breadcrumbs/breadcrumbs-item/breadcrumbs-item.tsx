import BreadcrumbsLink from './breadcrumbs-link';

import { AppRoute } from '../../../const/app-route';
import { BreadcrumbsNames } from '../../../const/breadcrumbs-names';
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
        title={BreadcrumbsNames.Catalog}
      />
      <BreadcrumbsActiveItem
        title={isProductPage ? productName : BreadcrumbsNames.Basket}
      />
    </>

  );
}

export default BreadcrumbsItem;
