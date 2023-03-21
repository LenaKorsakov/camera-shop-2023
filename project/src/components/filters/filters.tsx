import { FilterCategory } from '../../const/filter-category';
import { FilterLevel } from '../../const/filter-level';
import { FilterType } from '../../const/filter-type';
import FilterPrice from '../filter-price/filter-price';

function Filters(): JSX.Element {
  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <FilterPrice/>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {Object.entries(FilterCategory).map(([name, title]) => (
              <div className="custom-checkbox catalog-filter__item" key={name}>
                <label>
                  <input
                    type="checkbox"
                    name={name[0].toLowerCase().concat(name.slice(1))}
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">
                    {title}
                  </span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            {Object.entries(FilterType).map(([name, title]) => (
              <div className="custom-checkbox catalog-filter__item" key={name}>
                <label>
                  <input
                    type="checkbox"
                    name={name[0].toLowerCase().concat(name.slice(1))}
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">
                    {title}
                  </span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            {Object.entries(FilterLevel).map(([name, title]) => (
              <div className="custom-checkbox catalog-filter__item" key={name}>
                <label>
                  <input
                    type="checkbox"
                    name={name[0].toLowerCase().concat(name.slice(1))}
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">
                    {title}
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
