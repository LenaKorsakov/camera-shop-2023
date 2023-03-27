import { ChangeEvent, SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getCamerasMaxPrice, getCamerasMinPrice } from '../../store/filter-process/filter-process-selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { displayError } from '../../store/actions';

import { QueryKey } from '../../const/query-key';
import { WarningMessage } from '../../const/warning-message';

import { UserInput } from '../../@types/store-types';

type FilterByPriceProps = {
  bottomPrice: UserInput;
  topPrice: UserInput;
  onBottomPriceChange: (bottomPrice: UserInput) => void;
  onTopPriceChange: (topPrice: UserInput) => void;
  isBottomPriceInvalid: boolean;
  onBottomPriceInvalidChange: (isBottomPriceInvalid: boolean) => void;
  isTopPriceInvalid: boolean;
  onTopPriceInvalidChange: (isTopPriceInvalid: boolean) => void;
}

function FilterByPrice({bottomPrice, topPrice, onBottomPriceChange, onTopPriceChange, isBottomPriceInvalid, onBottomPriceInvalidChange: setBottomPriceInvalid, isTopPriceInvalid, onTopPriceInvalidChange: setTopPriceInvalid}: FilterByPriceProps): JSX.Element {
  const dispatch = useAppDispatch();

  const minPrice = useAppSelector(getCamerasMinPrice);
  const maxPrice = useAppSelector(getCamerasMaxPrice);

  const numBottomPrice = Number(bottomPrice);
  const numTopPrice = Number(topPrice);

  const [searchParams, setSearchParams ] = useSearchParams();

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
    } else {
      dispatch(displayError(WarningMessage.FilterWrongBottomPriceWarning));
      setBottomPriceInvalid(true);
    }
  };

  const getValidTopPrice = () => {
    if (numTopPrice !== 0) {
      if (numTopPrice > maxPrice) {
        return maxPrice;
      }
      if (numTopPrice < minPrice && numBottomPrice === 0) {
        return minPrice;
      }
      if ((numTopPrice < numBottomPrice || numTopPrice < minPrice) && numBottomPrice !== 0) {
        return numBottomPrice;
      }
      return numTopPrice;
    } else {
      dispatch(displayError(WarningMessage.FilterWrongTopPriceWarning));
      setTopPriceInvalid(true);
    }
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

    if (numBottomPrice !== 0 && numTopPrice !== 0) {
      setBottomPriceInvalid(false);
      setTopPriceInvalid(false);

      setSearchParams(searchParams);
    } else {
      if (numBottomPrice === 0) {
        setBottomPriceInvalid(true);
      }
      if (numTopPrice === 0) {
        setTopPriceInvalid(true);
      }
      dispatch(displayError(WarningMessage.FilterWrongPriceWarning));
    }
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
