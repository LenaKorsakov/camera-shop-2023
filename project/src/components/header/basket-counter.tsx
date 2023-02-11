import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { PURCHASES } from '../../const/const';

function BasketCounter(): JSX.Element{
  const basketCount = PURCHASES.length;
  //TODO селектор getPurchases

  return(
    <Link className="header__basket-link" to={AppRoute.Basket}>
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      {basketCount && <span className="header__basket-count">{basketCount}</span>}
    </Link>
  );
}

export default BasketCounter;
