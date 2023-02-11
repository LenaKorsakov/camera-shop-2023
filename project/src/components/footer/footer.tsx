import { NAV_ITEMS } from '../../const/nav-items';
import { RESOURCES_ITEMS } from '../../const/resources-items';
import { SOCIAL_ITEMS } from '../../const/social-items';
import { SUPPORT_ITEMS } from '../../const/support-items';
import FooterLogo from './footer-logo';
import FooterNavItem from './footer-nav-item';
import SocialItem from './social-item';

function Footer(): JSX.Element {
  //еще упростим
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
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              {NAV_ITEMS.map(({title, route}) => (
                <FooterNavItem
                  title={title}
                  route={route}
                  key={title}
                />
              ))}
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              {RESOURCES_ITEMS.map(({title, route}) => (
                <FooterNavItem
                  title={title}
                  route={route}
                  key={title}
                />
              ))}
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              {SUPPORT_ITEMS.map(({title, route}) => (
                <FooterNavItem
                  title={title}
                  route={route}
                  key={title}
                />
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
