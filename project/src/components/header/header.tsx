import BasketCounter from './basket-counter';
import SearchForm from '../search-form/search-form';
import Logo from '../logo/logo';
import NavItem from '../nav-item/nav-item';

import { NAV_ITEMS } from '../../const/nav-items';
import { ComponentName } from '../../const/component-name';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo currentComponent={ComponentName.Header}/>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {NAV_ITEMS.map(({title, route}, index) => {
              const keyValue = `${title}-${index}`;

              return (
                <NavItem
                  title={title}
                  route={route}
                  key={keyValue}
                  currentComponent={ComponentName.Header}
                />
              );}
            )}
          </ul>
        </nav>
        <SearchForm/>
        <BasketCounter/>
      </div>
    </header>
  );
}

export default Header;
