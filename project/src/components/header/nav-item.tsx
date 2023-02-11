import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

type NavItemProps = {
title: string;
route: string | AppRoute;
}
//TODO Можно будет добавить activeClassName

function NavItem({title, route}: NavItemProps): JSX.Element{
  return(
    <li className="main-nav__item">
      <NavLink className="main-nav__link" to={route}>
        {title}
      </NavLink>
    </li>
  );
}

export default NavItem;
