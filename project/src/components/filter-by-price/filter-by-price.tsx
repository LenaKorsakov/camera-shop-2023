import { ChangeEvent, useState } from 'react';
import { UserInput } from '../../@types/store-types';
import { QueryKey } from '../../const/query-key';
import { useAppSelector } from '../../hooks';
import { getCamerasMaxPrice, getCamerasMinPrice } from '../../store/filter-process/filter-process-selectors';

type FilterByPriceProps = {
  bottomPrice: UserInput;
  topPrice: UserInput;
  onBottomPriceChange: (priceFrom: UserInput) => void;
  onTopPriceChange: (priceTo: UserInput) => void;
}


function FilterByPrice({bottomPrice, topPrice, onBottomPriceChange, onTopPriceChange}: FilterByPriceProps): JSX.Element {
  const minPrice = useAppSelector(getCamerasMinPrice);
  const maxPrice = useAppSelector(getCamerasMaxPrice);

  const [isPriceFromInvalid, setPriceFromIsInvalid] = useState<boolean>(false);
  const [isPriceToInvalid, setPriceToInvalid] = useState<boolean>(false);

  const handlePriceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value as UserInput;
    const filterType = event.target.dataset.query as QueryKey;
    const isNotValid = Number(price) < 0;

    switch(filterType) {
      case QueryKey.PriceFrom : {
        if (isNotValid) {
          setPriceFromIsInvalid(true);
          onBottomPriceChange('');

          return;
        }

        setPriceFromIsInvalid(false);
        onBottomPriceChange(price);
        break;
      }

      case QueryKey.PriceTo :
        if(isNotValid) {
          setPriceToInvalid(true);
          onTopPriceChange('');

          return;
        }

        setPriceToInvalid(false);
        onTopPriceChange(price);
        break;
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
              value={bottomPrice}
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
              value={topPrice}
              onChange={handlePriceInputChange}
              data-query={QueryKey.PriceTo}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterByPrice;
