import { ChangeEvent, useState } from 'react';
import { UserInput } from '../../@types/store-types';
import { QueryKey } from '../../const/query-key';
import { useAppSelector } from '../../hooks';
import { getMaxPrice, getMinPrice } from '../../store/filter-process/filter-process-selectors';

type FilterPriceProps = {
  priceFrom: UserInput;
  priceTo: UserInput;
  onPriceFromChange: (priceFrom: UserInput) => void;
  onPriceToChange: (priceTo: UserInput) => void;
}


function FilterPrice({priceFrom, priceTo, onPriceFromChange, onPriceToChange}: FilterPriceProps): JSX.Element {
  const minPrice = useAppSelector(getMinPrice);
  const maxPrice = useAppSelector(getMaxPrice);

  const [isPriceFromInvalid, setPriceFromIsInvalid] = useState<boolean>(false);
  const [isPriceToInvalid, setPriceToInvalid] = useState<boolean>(false);

  const handlePriceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value as UserInput;
    const filterType = event.target.dataset.query as QueryKey;
    const isNotValid = Number(price) < 0;

    if (filterType === QueryKey.PriceFrom) {
      if (isNotValid) {
        setPriceFromIsInvalid(true);
        onPriceFromChange('');

        return;
      }

      setPriceFromIsInvalid(false);
      onPriceFromChange(price);
    }

    if (filterType === QueryKey.PriceTo) {
      if(isNotValid) {
        setPriceToInvalid(true);
        onPriceToChange('');

        return;
      }

      setPriceToInvalid(false);
      onPriceToChange(price);
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className={`custom-input ${isPriceFromInvalid ? 'is-invalid' : '' }`}>
          <label>
            <input
              type="number"
              name="price"
              placeholder={`от ${minPrice}`}
              value={priceFrom}
              onChange={handlePriceInputChange}
              data-query={QueryKey.PriceFrom}
            />
          </label>
        </div>
        <div className={`custom-input ${isPriceToInvalid ? 'is-invalid' : '' }`}>
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={`до ${maxPrice}`}
              value={priceTo}
              onChange={handlePriceInputChange}
              data-query={QueryKey.PriceTo}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
