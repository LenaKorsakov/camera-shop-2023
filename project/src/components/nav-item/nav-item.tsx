import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { ComponentName } from '../../const/component-name';

type NavItemProps = {
title: string;
route: string | AppRoute;
currentComponent: ComponentName;
}

const NavItemClass = {
  HeaderItem: 'main-nav__item',
  FooterItem: 'footer__item',
  HeaderLink: 'main-nav__link',
  FooterLink: 'link',
} as const;

function NavItem({title, route, currentComponent}: NavItemProps): JSX.Element{
  const itemsClassName = currentComponent === ComponentName.Header
    ? NavItemClass.HeaderItem
    : NavItemClass.FooterItem;

  const linksClassName = currentComponent === ComponentName.Header
    ? NavItemClass.HeaderLink
    : NavItemClass.FooterLink;

  return(
    <li className={itemsClassName} data-testid="nav">
      <Link className={linksClassName} to={route} data-testid="link">
        {title}
      </Link>
    </li>
  );
}

export default NavItem;
