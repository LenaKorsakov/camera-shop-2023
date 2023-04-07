import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { getCamerasInTheBasket } from '../../store/order-process/order-process-selectors';

import { AppRoute } from '../../const/app-route';

function BasketCounter(): JSX.Element{

  const camerasInBasket = useAppSelector(getCamerasInTheBasket);
  const basketCount = camerasInBasket.length;

  return(
    <Link className="header__basket-link" to={AppRoute.Basket}>
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      {basketCount > 0 && <span className="header__basket-count">{basketCount}</span>}
    </Link>
  );
}

export default BasketCounter;
