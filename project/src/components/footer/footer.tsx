import FooterItem from './footer-item/footer-item';
import SocialList from './footer-item/social-list';
import Logo from '../logo/logo';

import { FOOTER_ITEMS } from '../../const/nav-items-titles';
import { ComponentName } from '../../const/component-name';

function Footer(): JSX.Element {

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Logo currentComponent={ComponentName.Footer}/>
          <p className="footer__description">
      Интернет-магазин фото- и видеотехники
          </p>
          <SocialList/>
        </div>
        <ul className="footer__nav">
          {FOOTER_ITEMS.map((item, index) => {
            const keyValue = `${item.name}-${index}`;

            return (
              <FooterItem
                navItem={item}
                key={keyValue}
              />
            );}
          )}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
