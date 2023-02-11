import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

function FooterLogo(): JSX.Element{
  return(
    <Link
      className="footer__logo"
      to={AppRoute.Main}
      aria-label="Переход на главную"
    >
      <svg width={100} height={36} aria-hidden="true">
        <use xlinkHref="#icon-logo-mono" />
      </svg>
    </Link>
  );
}

export default FooterLogo;
