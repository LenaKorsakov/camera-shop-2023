import { ChangeEvent, useCallback, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import FilterByPrice from '../filter-by-price/filter-by-price';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasMaxPrice, getCamerasMinPrice, getCurrentFilterByCategory, getCurrentFiltersByLevels, getCurrentFiltersByTypes, getUserEnteredBottomPrice, getUserEnteredTopPrice } from '../../store/filter-process/filter-process-selectors';
import { deleteCurrentFilter, resetFilters } from '../../store/filter-process/filter-process';
import { fetchMaxPriceAction, fetchMinPriceAction } from '../../store/api-actions/api-actions';

import { AppRoute } from '../../const/app-route';
import { MIN_PAGE_NUMBER } from '../../const/const';
import { FilterByCategory } from '../../const/filter-by-category';
import { FilterByLevel } from '../../const/filter-by-level';
import { FilterByType } from '../../const/filter-by-type';
import { QueryKey } from '../../const/query-key';

import { UserInput } from '../../@types/store-types';

const SNAPSHOT_PARAMS = {key: QueryKey.FilterType, value: FilterByType.Snapshot};
const FILM_PARAMS = {key: QueryKey.FilterType, value: FilterByType.Film};

const excludeParams = (params: URLSearchParams, excludedValues: string[]) => {
  //удаление из строки запроса ненужных параметров
  const cleanedParams = [...params.entries()]
    .filter(([_arg, value]) => !excludedValues.includes(value));

  return new URLSearchParams(cleanedParams);
};

function Filters(): JSX.Element {
  const currentFiltersByType = useAppSelector(getCurrentFiltersByTypes);
  const currentFiltersByLevels = useAppSelector(getCurrentFiltersByLevels);
  const currentFilterByCategory = useAppSelector(getCurrentFilterByCategory);

  const currentBottomPrice = useAppSelector(getUserEnteredBottomPrice);
  const currentTopPrice = useAppSelector(getUserEnteredTopPrice);

  const currentMinPrice = useAppSelector(getCamerasMinPrice);
  const currentMaxPrice = useAppSelector(getCamerasMaxPrice);

  const [bottomPrice, setBottomPrice] = useState<UserInput>(currentBottomPrice);
  const [topPrice, setTopPrice] = useState<UserInput>(currentTopPrice);

  useEffect(() => {
    if (Number(currentBottomPrice) !== currentMinPrice) {
      setBottomPrice(currentBottomPrice);
    }

    if (Number(currentTopPrice) !== currentMaxPrice) {
      setTopPrice(currentTopPrice);
    }
  }, [currentBottomPrice, currentTopPrice, currentMinPrice, currentMaxPrice]);

  const isVideocamera = currentFilterByCategory === FilterByCategory.Videocamera;

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isChecked = (filter: string, filtres: string[]) => filtres.some((value) => value === filter);

  const makeVideocameraSearchParams = (queryKey: QueryKey, queryValue: string) => {
    dispatch(deleteCurrentFilter(FILM_PARAMS));
    dispatch(deleteCurrentFilter(SNAPSHOT_PARAMS));

    const videocameraSearchParams = excludeParams(searchParams, [FilterByType.Film, FilterByType.Snapshot, FilterByCategory.Photocamera]);
    videocameraSearchParams.append(queryKey, queryValue);

    return videocameraSearchParams;
  };

  const makePhotocameraSearchParams = (queryKey: QueryKey, queryValue: string): URLSearchParams => {
    const photocameraSearchParams = excludeParams(searchParams, [FilterByCategory.Videocamera]);
    photocameraSearchParams.append(queryKey, queryValue);

    return photocameraSearchParams;
  };

  const makeCheckedFilterSearchParams = (queryKey: QueryKey, queryValue: string): URLSearchParams => {
    if (queryValue === FilterByCategory.Photocamera) {
      return makePhotocameraSearchParams(queryKey, queryValue);
    }

    if (queryValue === FilterByCategory.Videocamera) {
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

    setBottomPrice('');
    setTopPrice('');
  };

  useEffect(() => {
    dispatch(fetchMinPriceAction());
    dispatch(fetchMaxPriceAction());
  }, [currentFilterByCategory, currentFiltersByLevels, currentFiltersByType, dispatch]);

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#" onReset={handleFormReset}>
          <h2 className="visually-hidden">Фильтр</h2>
          <FilterByPrice
            bottomPrice={bottomPrice}
            topPrice={topPrice}
            onBottomPriceChange={setBottomPrice}
            onTopPriceChange={setTopPrice}
          />
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {Object.entries(FilterByCategory).map(([name, category]) => (
              <div className="custom-checkbox catalog-filter__item" key={name}>
                <label>
                  <input
                    type="checkbox"
                    name={name[0].toLowerCase().concat(name.slice(1))}
                    checked={category === currentFilterByCategory}
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
            {Object.entries(FilterByType).map(([name, type]) => {
              const isDisabled = (type === FilterByType.Snapshot || type === FilterByType.Film) && isVideocamera;
              return (
                <div className="custom-checkbox catalog-filter__item" key={name}>
                  <label>
                    <input
                      type="checkbox"
                      name={name[0].toLowerCase().concat(name.slice(1))}
                      checked={isChecked(type, currentFiltersByType)}
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
            {Object.entries(FilterByLevel).map(([name, level]) => (
              <div className="custom-checkbox catalog-filter__item" key={name}>
                <label>
                  <input
                    type="checkbox"
                    name={name[0].toLowerCase().concat(name.slice(1))}
                    checked={isChecked(level, currentFiltersByLevels)}
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
