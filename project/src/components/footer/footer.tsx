import FooterLogo from './footer-logo';
import FooterItem from './footer-item';
import SocialItem from './social-item';

import { FOOTER_ITEMS, SOCIAL_ITEMS } from '../../const/nav-items-titles';

function Footer(): JSX.Element {

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <FooterLogo/>
          <p className="footer__description">
      Интернет-магазин фото- и видеотехники
          </p>
          <ul className="social">
            {SOCIAL_ITEMS.map(({title, icon, link}) => (
              <SocialItem
                title={title}
                icon={icon}
                link={link}
                key={`${title}-${icon}`}
              />
            ))}
          </ul>
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
