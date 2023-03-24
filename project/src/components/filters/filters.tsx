import { ChangeEvent, useCallback, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentFilterCategory, getCurrentFilterLevels, getCurrentFilterTypes } from '../../store/filter-process/filter-process-selectors';
import { deleteCurrentFilter, resetFilters } from '../../store/filter-process/filter-process';

import FilterPrice from '../filter-price/filter-price';
import { AppRoute } from '../../const/app-route';
import { MIN_PAGE_NUMBER } from '../../const/const';
import { FilterCategory } from '../../const/filter-category';
import { FilterLevel } from '../../const/filter-level';
import { FilterType } from '../../const/filter-type';
import { QueryKey } from '../../const/query-key';
import { UserInput } from '../../@types/store-types';
import { fetchPricesAction } from '../../store/api-actions/api-actions';

const SNAPSHOT_PARAMS = {key: QueryKey.FilterType, value: FilterType.Snapshot};
const FILM_PARAMS = {key: QueryKey.FilterType, value: FilterType.Film};

const excludeParams = (params: URLSearchParams, excludedValues: string[]) => {
  //удаление из строки запроса ненужных параметров
  const cleanedParams = [...params.entries()]
    .filter(([_arg, value]) => !excludedValues.includes(value));

  return new URLSearchParams(cleanedParams);
};

function Filters(): JSX.Element {
  const currentFilterTypes = useAppSelector(getCurrentFilterTypes);
  const currentFilterLevels = useAppSelector(getCurrentFilterLevels);
  const currentFilterCategory = useAppSelector(getCurrentFilterCategory);
  const isVideocamera = currentFilterCategory === FilterCategory.Videocamera;

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [priceFrom, setPriceFrom] = useState<UserInput>('');
  const [priceTo, setPriceTo] = useState<UserInput>('');

  const isChecked = (filter: string, filtres: string[]) => filtres.some((value) => value === filter);

  const makeVideocameraSearchParams = (queryKey: QueryKey, queryValue: string) => {
    dispatch(deleteCurrentFilter(FILM_PARAMS));
    dispatch(deleteCurrentFilter(SNAPSHOT_PARAMS));

    const videocameraSearchParams = excludeParams(searchParams, [FilterType.Film, FilterType.Snapshot, FilterCategory.Photocamera]);
    videocameraSearchParams.append(queryKey, queryValue);

    return videocameraSearchParams;
  };

  const makePhotocameraSearchParams = (queryKey: QueryKey, queryValue: string): URLSearchParams => {
    const photocameraSearchParams = excludeParams(searchParams, [FilterCategory.Videocamera]);
    photocameraSearchParams.append(queryKey, queryValue);

    return photocameraSearchParams;
  };

  const makeCheckedFilterSearchParams = (queryKey: QueryKey, queryValue: string): URLSearchParams => {
    if (queryValue === FilterCategory.Photocamera) {
      return makePhotocameraSearchParams(queryKey, queryValue);
    }

    if (queryValue === FilterCategory.Videocamera) {
      return makeVideocameraSearchParams(queryKey, queryValue);
    }

    const params = new URLSearchParams([...searchParams.entries(), [queryKey, queryValue]]);
    return params;
  };

  const getUncheckedFilterSearchParams = (queryKey: QueryKey, queryValue: string) => {
    dispatch(deleteCurrentFilter({key: queryKey, value: queryValue}));

    return excludeParams(searchParams, [queryValue]);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkbox = event.target;
    const queryKey = checkbox.dataset.query as QueryKey;
    const value = checkbox.dataset.value as string;

    if (value) {

      const updatedSearchParams = checkbox.checked ? makeCheckedFilterSearchParams(queryKey, value) : getUncheckedFilterSearchParams(queryKey, value);

      setSearchParams(updatedSearchParams);

      navigate({
        pathname: `${AppRoute.Catalog}${MIN_PAGE_NUMBER}`,
        search: updatedSearchParams.toString()
      });
    }
  };

  const deleteSearchParams = useCallback(() => {
    Object.values(QueryKey).forEach((key) => {
      if(key === QueryKey.SortOrder || key === QueryKey.SortType) {
        return;
      }

      searchParams.delete(key);
    });
  },[searchParams]);

  const handleFormReset = () => {
    dispatch(resetFilters());
    deleteSearchParams();
    setSearchParams(searchParams);

    setPriceFrom('');
    setPriceTo('');
  };

  // useEffect(() => () => {
  //   dispatch(resetFilters());
  //   deleteSearchParams();
  // }, [dispatch, deleteSearchParams]);

  useEffect(() => {
    dispatch(fetchPricesAction());
  }, [currentFilterCategory, currentFilterLevels, currentFilterTypes, dispatch]);

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#" onReset={handleFormReset}>
          <h2 className="visually-hidden">Фильтр</h2>
          <FilterPrice
            priceFrom={priceFrom}
            priceTo={priceTo}
            onPriceFromChange={setPriceFrom}
            onPriceToChange={setPriceTo}
          />
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {Object.entries(FilterCategory).map(([name, category]) => (
              <div className="custom-checkbox catalog-filter__item" key={name}>
                <label>
                  <input
                    type="checkbox"
                    name={name[0].toLowerCase().concat(name.slice(1))}
                    checked={category === currentFilterCategory}
                    data-query={QueryKey.FilterCategory}
                    data-value={category}
                    onChange={handleCheckboxChange}
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">
                    {category}
                  </span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            {Object.entries(FilterType).map(([name, type]) => {
              const isDisabled = (type === FilterType.Snapshot || type === FilterType.Film) && isVideocamera;
              return (
                <div className="custom-checkbox catalog-filter__item" key={name}>
                  <label>
                    <input
                      type="checkbox"
                      name={name[0].toLowerCase().concat(name.slice(1))}
                      checked={isChecked(type, currentFilterTypes)}
                      disabled={isDisabled}
                      data-query={QueryKey.FilterType}
                      data-value={type}
                      onChange={handleCheckboxChange}
                    />
                    <span className="custom-checkbox__icon" />
                    <span className="custom-checkbox__label">
                      {type}
                    </span>
                  </label>
                </div>
              );
            })}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            {Object.entries(FilterLevel).map(([name, level]) => (
              <div className="custom-checkbox catalog-filter__item" key={name}>
                <label>
                  <input
                    type="checkbox"
                    name={name[0].toLowerCase().concat(name.slice(1))}
                    checked={isChecked(level, currentFilterLevels)}
                    data-query={QueryKey.FilterLevel}
                    data-value={level}
                    onChange={handleCheckboxChange}
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">
                    {level}
                  </span>
                </label>
              </div>
            ))}
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
          >
                    Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default Filters;
