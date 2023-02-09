import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

//Пропс показывать третью часть или нет
//Пропс текстконтент 3 части
//isActive для смены цвета

function Breadcrumbs(): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Main}>
        Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Main}>
        Каталог
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">
        Ретрокамера «Das Auge IV»
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
