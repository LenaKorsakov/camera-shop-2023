import { BreadcrumbsName } from '../../../const/breadcrumbs-name';

type BreadcrumbsActiveItemProps = {
  title: BreadcrumbsName | string | undefined;
}

function BreadcrumbsActiveItem({ title }: BreadcrumbsActiveItemProps): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <span className="breadcrumbs__link breadcrumbs__link--active">
        {title}
      </span>
    </li>
  );
}

export default BreadcrumbsActiveItem;
