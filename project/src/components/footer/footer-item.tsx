import FooterNavItem from './footer-nav-item';
import { FooterColumn } from '../../const/nav-items-titles';
import { memo } from 'react';

type FooterItemProps = {
navItem: FooterColumn;
}

function FooterItem({navItem}: FooterItemProps): JSX.Element {
  const { name, items } = navItem;

  return(
    <li className="footer__nav-item">
      <p className="footer__title">{name}</p>
      <ul className="footer__list">
        {items.map(({title, route}) => (
          <FooterNavItem
            title={title}
            route={route}
            key={title}
          />
        ))}
      </ul>
    </li>
  );
}

export default memo(FooterItem);
