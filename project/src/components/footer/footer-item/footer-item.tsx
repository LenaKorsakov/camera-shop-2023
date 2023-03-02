import NavItem from '../../nav-item/nav-item';

import { FooterColumn } from '../../../const/nav-items-titles';
import { ComponentName } from '../../../const/component-name';

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
          <NavItem
            title={title}
            route={route}
            currentComponent={ComponentName.Footer}
            key={title}
          />
        ))}
      </ul>
    </li>
  );
}

export default FooterItem;
