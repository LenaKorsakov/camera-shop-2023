import { UserInput } from '../../@types/store-types';
import { QueryKey } from '../../const/query-key';
import { useAppSelector } from '../../hooks';
import { getMaxPrice, getMinPrice } from '../../store/filter-process/filter-process-selectors';

type FilterPriceProps = {
  priceFrom: UserInput;
  priceTo: UserInput;
  onPriceFrom: (priceFrom: UserInput) => void;
  onPriceTo: (priceTo: UserInput) => void;
}


function FilterPrice({priceFrom, priceTo, onPriceFrom, onPriceTo}: FilterPriceProps): JSX.Element {
  const minPrice = useAppSelector(getMinPrice);
  const maxPrice = useAppSelector(getMaxPrice);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={`от ${minPrice}`}
              value={priceFrom}
              data-query={QueryKey.PriceFrom}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={`до ${maxPrice}`}
              value={priceTo}
              data-query={QueryKey.PriceTo}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
