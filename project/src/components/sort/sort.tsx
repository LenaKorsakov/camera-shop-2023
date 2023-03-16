/* eslint-disable no-console */
import { ChangeEvent, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
//import { AppRoute } from '../../const/app-route';
//import { MIN_PAGE_NUMBER } from '../../const/const';
import { Query } from '../../const/query';
import { ServerOrderValue, SORT_ORDER } from '../../const/sort-order';
import { ServerTypeValue, SORT_TYPE } from '../../const/sort-type';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAllCameraAction } from '../../store/api-actions/api-actions';
import { changeSortOrder, changeSortType } from '../../store/sort-process/sort-process';
import { getCurrentSortOrder, getCurrentSortType } from '../../store/sort-process/sort-process-selectors';

function Sort(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();

  const currentSortType = useAppSelector(getCurrentSortType);
  const currentOrderType = useAppSelector(getCurrentSortOrder);

  const handleInputSortTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target;

    const selectedType = element.dataset.value;

    if (selectedType) {
      dispatch(changeSortType(selectedType as ServerTypeValue));

      currentOrderType
        ? setSearchParams({[Query.SortType]: selectedType, [Query.SortOrder]: currentOrderType })
        : setSearchParams({[Query.SortType]: selectedType, [Query.SortOrder]: ServerOrderValue.OrderUp});

      dispatch(fetchAllCameraAction());
      //navigate(`${AppRoute.Catalog}${MIN_PAGE_NUMBER}?${searchParams.toString()}`);
    }
  };

  const handleInputSortOrderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target;

    const selectedOrder = element.dataset.value;

    if (selectedOrder) {
      dispatch(changeSortOrder(selectedOrder as ServerOrderValue));

      currentSortType
        ? setSearchParams({[Query.SortType]: currentSortType, [Query.SortOrder]: selectedOrder})
        : setSearchParams({[Query.SortType]: ServerTypeValue.Price, [Query.SortOrder]: selectedOrder});

      console.log(searchParams.toString());

      dispatch(fetchAllCameraAction());

      //navigate(`${AppRoute.Catalog}${MIN_PAGE_NUMBER}?${searchParams.toString()}`);
    }
  };

  // useEffect(() => () => {
  //   dispatch(resetSort());
  //   searchParams.delete(Query.SortOrder);
  //   searchParams.delete(Query.SortType);
  // }, []);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {SORT_TYPE.map(({title, id, value}) => (
              <div className="catalog-sort__btn-text" key={id}>
                <input
                  type="radio"
                  id={id}
                  name="sort"
                  data-value={value}
                  checked={value === currentSortType}
                  onChange={handleInputSortTypeChange}
                />
                <label htmlFor={id}>{title}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {SORT_ORDER.map(({title, id, value}) => (
              <div className={`catalog-sort__btn catalog-sort__btn--${id}`} key={id}>
                <input
                  type="radio"
                  id={id}
                  name="sort-icon"
                  aria-label={title}
                  data-value={value}
                  checked={value === currentOrderType}
                  onChange={handleInputSortOrderChange}
                />{' '}
                <label htmlFor={id}>
                  <svg width={16} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-sort" />
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default memo(Sort);
