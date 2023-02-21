import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

type FooterNavItemProps = {
title: string;
route: string | AppRoute;
}

function FooterNavItem({title, route}: FooterNavItemProps): JSX.Element{
  return(
    <li className="footer__item">
      <Link className="link" to={route}>
        {title}
      </Link>
    </li>
  );
}

export default FooterNavItem;
