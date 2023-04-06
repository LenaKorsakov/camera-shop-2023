import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getCamerasMaxPrice, getCamerasMinPrice } from '../../store/filter-process/filter-process-selectors';
import { useAppSelector } from '../../hooks';

import { QueryKey } from '../../const/query-key';
import { AppRoute } from '../../const/app-route';
import { MIN_PAGE_NUMBER } from '../../const/const';

import { UserInput } from '../../@types/store-types';

type FilterByPriceProps = {
  bottomPrice: UserInput;
  topPrice: UserInput;
  onBottomPriceChange: (bottomPrice: UserInput) => void;
  onTopPriceChange: (topPrice: UserInput) => void;
}

function FilterByPrice({bottomPrice, topPrice, onBottomPriceChange, onTopPriceChange}: FilterByPriceProps): JSX.Element {

  const minPrice = useAppSelector(getCamerasMinPrice);
  const maxPrice = useAppSelector(getCamerasMaxPrice);

  const numBottomPrice = Number(bottomPrice);
  const numTopPrice = Number(topPrice);

  const [searchParams, setSearchParams ] = useSearchParams();
  const navigate = useNavigate();

  const [isBottomPriceInvalid, setBottomPriceInvalid] = useState<boolean>(false);
  const [isTopPriceInvalid, setTopPriceInvalid] = useState<boolean>(false);

  const getValidBottomPrice = () => {
    if (numBottomPrice !== 0) {
      if (numBottomPrice < minPrice) {
        return minPrice;
      }
      if (numBottomPrice > maxPrice && numTopPrice === 0) {
        return maxPrice;
      }
      if ((numBottomPrice > numTopPrice || numBottomPrice > maxPrice) && numTopPrice !== 0) {
        return numTopPrice;
      }

      return bottomPrice;
    }
  };

  const getValidTopPrice = () => {
    if (numTopPrice > maxPrice && numTopPrice !== 0) {
      return maxPrice;
    }
    if (numTopPrice < minPrice && numBottomPrice === 0) {
      return minPrice;
    }
    if ((numTopPrice < numBottomPrice || numTopPrice < minPrice) && numBottomPrice !== 0) {
      return numBottomPrice;
    }
    return numTopPrice;
  };

  const handlePriceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value as UserInput;
    const filterType = event.target.dataset.query as QueryKey;
    const isNotValid = Number(price) <= 0;

    switch(filterType) {
      case QueryKey.BottomPrice : {
        if (isNotValid) {
          setBottomPriceInvalid(true);
          onBottomPriceChange('');

          return;
        }

        setBottomPriceInvalid(false);
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
        const validBottomPrice = getValidBottomPrice();

        if (validBottomPrice) {
          onBottomPriceChange(validBottomPrice);

          searchParams.set(QueryKey.BottomPrice, String(validBottomPrice));
        }

        break;
      }

      case QueryKey.TopPrice: {
        const validTopPrice = getValidTopPrice();

        if (validTopPrice) {
          onTopPriceChange(validTopPrice);

          searchParams.set(QueryKey.TopPrice, String(validTopPrice));
        }

        break;
      }
    }

    if (numBottomPrice === 0) {
      onBottomPriceChange('');

      searchParams.set(QueryKey.BottomPrice, String(minPrice));
      setBottomPriceInvalid(false);
    }
    if (numTopPrice === 0) {
      onTopPriceChange('');

      searchParams.set(QueryKey.TopPrice, String(maxPrice));
      setTopPriceInvalid(false);
    }

    setSearchParams(searchParams);

    navigate({
      pathname: `${AppRoute.Catalog}${MIN_PAGE_NUMBER}`,
      search: searchParams.toString()
    });
  };

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    const input = event.target as HTMLElement;
    if (event.key.startsWith('Ent')) {
      input.blur();
    }
  };

  return (
    <fieldset className="catalog-filter__block" data-testid='filter-by-price'>
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className={`custom-input ${isBottomPriceInvalid ? 'is-invalid' : '' }`}>
          <label>
            <input
              type="number"
              name="price"
              placeholder={`${minPrice}`}
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
              placeholder={`${maxPrice}`}
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
