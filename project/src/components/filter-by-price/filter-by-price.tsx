import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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

  const [searchParams, setSearchParams] = useSearchParams();

  const [isBottomPriceInvalid, setBottomPriceIsInvalid] = useState<boolean>(false);
  const [isTopPriceInvalid, setTopPriceInvalid] = useState<boolean>(false);

  const handlePriceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value as UserInput;
    const filterType = event.target.dataset.query as QueryKey;
    const isNotValid = Number(price) <= 0;

    switch(filterType) {
      case QueryKey.BottomPrice : {
        if (isNotValid) {
          setBottomPriceIsInvalid(true);
          onBottomPriceChange('');

          return;
        }

        setBottomPriceIsInvalid(false);
        onBottomPriceChange(price);
        break;
      }

      case QueryKey.TopPrice :
        if(isNotValid) {
          setTopPriceInvalid(true);
          onTopPriceChange('');

          return;
        }

        setTopPriceInvalid(false);
        onTopPriceChange(price);
        break;
    }
  };

  const handlePriceInputBlur = (event: SyntheticEvent) => {
    const currentInput = event.target as HTMLInputElement;
    const filterType = currentInput.dataset.query as QueryKey;

    switch(filterType) {
      case QueryKey.BottomPrice: {
        const getValidBottomPrice = () => {
          if (Number(bottomPrice) < minPrice || Number(bottomPrice) === 0) {
            return minPrice;
          }
          if (Number(bottomPrice > maxPrice && Number(topPrice) === 0)) {
            return maxPrice;
          }
          if ((Number(bottomPrice) > Number(topPrice) || bottomPrice > maxPrice) && Number(topPrice) !== 0) {
            return Number(topPrice);
          }

          return bottomPrice;
        };

        const validBottomPrice = getValidBottomPrice();
        onBottomPriceChange(validBottomPrice);
        setBottomPriceIsInvalid(false);

        searchParams.set(QueryKey.BottomPrice, String(validBottomPrice));

        if (Number(topPrice) === 0) {
          onTopPriceChange(maxPrice);

          searchParams.set(QueryKey.TopPrice, String(maxPrice));
        }

        break;
      }

      case QueryKey.TopPrice: {
        const getValidTopPrice = () => {
          if (Number(topPrice) > maxPrice || Number(bottomPrice) === 0) {
            return maxPrice;
          }
          if (Number(topPrice < minPrice && Number(bottomPrice) === 0)) {
            return minPrice;
          }
          if ((Number(topPrice) < Number(bottomPrice) || topPrice < minPrice) && Number(bottomPrice) !== 0) {
            return Number(bottomPrice);
          }

          return topPrice;
        };

        const validTopPrice = getValidTopPrice();
        onTopPriceChange(validTopPrice);
        setTopPriceInvalid(false);

        searchParams.set(QueryKey.TopPrice, String(validTopPrice));

        if (Number(bottomPrice) === 0) {
          onBottomPriceChange(minPrice);

          searchParams.set(QueryKey.BottomPrice, String(minPrice));
        }

        break;
      }
    }
    setSearchParams(searchParams);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    const input = event.target as HTMLElement;
    if (event.key.startsWith('Ent')) {
      input.blur();
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className={`custom-input ${isBottomPriceInvalid ? 'is-invalid' : '' }`}>
          <label>
            <input
              type="number"
              name="price"
              placeholder={`от ${minPrice}`}
              value={bottomPrice}
              onChange={handlePriceInputChange}
              onBlur={handlePriceInputBlur}
              onKeyDown={handleInputKeyDown}
              data-query={QueryKey.BottomPrice}
            />
          </label>
        </div>
        <div className={`custom-input ${isTopPriceInvalid ? 'is-invalid' : '' }`}>
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={`до ${maxPrice}`}
              value={topPrice}
              onChange={handlePriceInputChange}
              onBlur={handlePriceInputBlur}
              onKeyDown={handleInputKeyDown}
              data-query={QueryKey.TopPrice}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterByPrice;
