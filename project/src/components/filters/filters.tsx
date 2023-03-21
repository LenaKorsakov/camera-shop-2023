import { ChangeEvent, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentFilterCategory, getCurrentFilterLevels, getCurrentFilterTypes } from '../../store/filter-process/filter-process-selectors';

import FilterPrice from '../filter-price/filter-price';
import { AppRoute } from '../../const/app-route';
import { MIN_PAGE_NUMBER } from '../../const/const';
import { FilterCategory, ServerFilterValue } from '../../const/filter-category';
import { FilterLevel } from '../../const/filter-level';
import { FilterType } from '../../const/filter-type';
import { Query } from '../../const/query';
import { resetFilters } from '../../store/filter-process/filter-process';

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

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkbox = event.target;
    const queryKey = checkbox.dataset.query as Query;
    const value = checkbox.dataset.value as string;

    //здесь надо предусмотреть сброс

    value === FilterCategory.Photocamera ? searchParams.append(queryKey, ServerFilterValue.Photocamera) : searchParams.append(queryKey, value);

    setSearchParams(searchParams);

    navigate({
      pathname: `${AppRoute.Catalog}${MIN_PAGE_NUMBER}`,
      search: searchParams.toString()
    });
  };

  const handleFormReset = () => {
    dispatch(resetFilters());
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
