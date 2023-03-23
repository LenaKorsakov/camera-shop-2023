import { UserInput } from '../../@types/store-types';
import { QueryKey } from '../../const/query-key';

type FilterPriceProps = {
  priceFrom: UserInput;
  priceTo: UserInput;
  onPriceFrom: (priceFrom: UserInput) => void;
  onPriceTo: (priceTo: UserInput) => void;
}


function FilterPrice({priceFrom, priceTo, onPriceFrom, onPriceTo}: FilterPriceProps): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder="от"
              value={priceFrom}
              data-query={QueryKey.MinPrice}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder="до"
              value={priceTo}
              data-query={QueryKey.MaxPrice}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
