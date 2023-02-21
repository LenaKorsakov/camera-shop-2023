import BasketCounter from './basket-counter';
import FormSearch from './form-search';
import Logo from './logo';
import NavItem from './nav-item';

import { NAV_ITEMS } from '../../const/nav-items-titles';
import { memo } from 'react';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo/>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {NAV_ITEMS.map(({title, route}, index) => {
              const keyValue = `${title}-${index}`;

              return (
                <NavItem
                  title={title}
                  route={route}
                  key={keyValue}
                />
              );}
            )}
          </ul>
        </nav>
        <FormSearch/>
        <BasketCounter/>
      </div>
    </header>
  );
}

export default memo(Header);
