import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { ComponentName } from '../../const/component-name';

type LogoProps = {
  currentComponent: ComponentName;
}

function Logo({currentComponent}: LogoProps): JSX.Element{
  return(
    <Link
      className={`${currentComponent}__logo`}
      to={AppRoute.Main}
      aria-label="Переход на главную"
      title="На главную"
      data-testid="link"
    >
      <svg width={100} height={36} aria-hidden="true">
        <use xlinkHref={currentComponent === ComponentName.Header ? '#icon-logo' : '#icon-logo-mono' } />
      </svg>
    </Link>
  );
}

export default Logo;
