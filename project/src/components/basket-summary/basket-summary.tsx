import BasketOrder from './basket-order/basket-order';
import BasketPromo from './basket-promo/basket-promo';

function BasketSummary(): JSX.Element {
  return (
    <div className="basket__summary">
      <BasketPromo/>
      <BasketOrder/>
    </div>
  );
}

export default BasketSummary;
