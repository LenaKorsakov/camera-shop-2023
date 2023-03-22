/* eslint-disable no-console */
import { ChangeEvent, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentFilterCategory, getCurrentFilterLevels, getCurrentFilterTypes } from '../../store/filter-process/filter-process-selectors';
import { deleteCurrentFilter, resetFilters } from '../../store/filter-process/filter-process';

import FilterPrice from '../filter-price/filter-price';
import { AppRoute } from '../../const/app-route';
import { MIN_PAGE_NUMBER } from '../../const/const';
import { FilterCategory } from '../../const/filter-category';
import { FilterLevel } from '../../const/filter-level';
import { FilterType } from '../../const/filter-type';
import { Query } from '../../const/query';

function Filters(): JSX.Element {
  const currentFilterTypes = useAppSelector(getCurrentFilterTypes);
  const currentFilterLevels = useAppSelector(getCurrentFilterLevels);
  const currentFilterCategory = useAppSelector(getCurrentFilterCategory);
  const isVideocamera = currentFilterCategory === FilterCategory.Videocamera;

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isChecked = (filter: string, filtres: string[]) => {
    if ((filter === FilterType.Film || filter === FilterType.Snapshot) && isVideocamera) {
      return false;
    }
    //работает некорректно
    return filtres.some((value) => value === filter);
  };

  const excludeParams = (params: URLSearchParams, excludedValues: string[]) => {
    //удаление из параметров поиска ненужных параметров
    const cleanedParams = [...params.entries()].filter(([_arg, value]) => {

      if (excludedValues.length === 1) {
        return value !== excludedValues[0];
      }

      if (excludedValues.length > 1) {
        return excludedValues.some((item) => item !== value);
      }

      return value;
    });

    return new URLSearchParams(cleanedParams);
  };

  const getVideocameraSearchParams = (queryKey: Query, queryValue: string): URLSearchParams => {
    dispatch(deleteCurrentFilter({key: Query.FilterType, value: FilterType.Film}));
    dispatch(deleteCurrentFilter({key: Query.FilterType, value: FilterType.Snapshot}));
    dispatch(deleteCurrentFilter({key: Query.FilterCategory, value: FilterCategory.Photocamera}));

    const videocameraSearchParams = excludeParams(searchParams, [FilterType.Film, FilterType.Snapshot, FilterCategory.Photocamera]);
    videocameraSearchParams.append(queryKey, queryValue);
    console.log(videocameraSearchParams.toString());

    return videocameraSearchParams;
  };

  const getPhotocameraSearchParams = (queryKey: Query, queryValue: string): URLSearchParams => {
    dispatch(deleteCurrentFilter({key: Query.FilterCategory, value: FilterCategory.Videocamera}));

    const photocameraSearchParams = excludeParams(searchParams, [FilterCategory.Videocamera]);
    photocameraSearchParams.append(queryKey, queryValue);

    return photocameraSearchParams;
  };

  const getSearchParams = (queryKey: Query, queryValue: string): URLSearchParams => {
    if (queryValue === FilterCategory.Photocamera) {
      return getPhotocameraSearchParams(queryKey, queryValue);
    }

    if (queryValue === FilterCategory.Videocamera) {
      return getVideocameraSearchParams(queryKey, queryValue);
    }

    const params = new URLSearchParams([...searchParams.entries(), [queryKey, queryValue]]);
    console.log(params.toString());
    console.log(queryKey, queryValue);

    return params;
  };

  const getUncheckedSearchParams = (queryKey: Query, queryValue: string) => {
    dispatch(deleteCurrentFilter({key: queryKey, value: queryValue}));

    return excludeParams(searchParams, [queryValue]);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkbox = event.target;
    const queryKey = checkbox.dataset.query as Query;
    const value = checkbox.dataset.value as string;

    let updatedSearchParams;

    //предусмотреть сброс чекбокса
    if (!checkbox.checked && value) {
      updatedSearchParams = getUncheckedSearchParams(queryKey, value);
    }

    if(checkbox.checked && value) {
      updatedSearchParams = getSearchParams(queryKey, value);
    }

    if (updatedSearchParams) {
      console.log(updatedSearchParams.toString());
      //level=%D0%9B%D1%8E%D0%B1%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9


      setSearchParams(updatedSearchParams);

      navigate({
        pathname: `${AppRoute.Catalog}${MIN_PAGE_NUMBER}`,
        search: searchParams.toString()
      });
    }
  };

  const deleteSearchParams = () => {
    Object.values(Query).forEach((key) => {
      if(key === Query.SortOrder || key === Query.SortType) {
        return;
      }
      searchParams.delete(key);
    });
  };

  const handleFormReset = () => {
    dispatch(resetFilters());
    deleteSearchParams();
    setSearchParams(searchParams);
  };

  useEffect(() => () => {
    dispatch(resetFilters());
  }, [dispatch]);

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#" onReset={handleFormReset}>
          <h2 className="visually-hidden">Фильтр</h2>
          <FilterPrice/>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {Object.entries(FilterCategory).map(([name, category]) => (
              <div className="custom-checkbox catalog-filter__item" key={name}>
                <label>
                  <input
                    type="checkbox"
                    name={name[0].toLowerCase().concat(name.slice(1))}
                    checked={category === currentFilterCategory}
                    data-query={Query.FilterCategory}
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
                      data-query={Query.FilterType}
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
                    data-query={Query.FilterLevel}
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
