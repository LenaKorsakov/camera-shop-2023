import { ChangeEvent, SyntheticEvent, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';

import LoadingPage from '../../pages/loading-page/loading-page';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraByIdAction, fetchSearchCameraAction } from '../../store/api-actions/api-actions';
import { getSearchedCameras, getSearchedCamerasStatus } from '../../store/catalog-process/catalog-process-selectors';
import useOnClickOutside from '../../hooks/use-on-click-outside';

import { FetchStatus } from '../../const/fetch-status';
import { WarningMessage } from '../../const/warning-message';
import { ErrorMessage } from '../../const/error-message';

import { SEARCH_DELAY } from '../../const/const';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { ComponentName } from '../../const/component-name';
import { DEFAULT_TABS_TYPE } from '../../const/tabs-buttons';

function FormSearch(): JSX.Element {
  const dispatch = useAppDispatch();
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const [isDropdownOpened, setDropdownIsOpened] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const debouncedFetchCameras = useMemo(
    () => debounce((value: string) => {
      dispatch(fetchSearchCameraAction(value));
    }, SEARCH_DELAY), [dispatch]);

  const searchedCameras = useAppSelector(getSearchedCameras);
  const fetchingStatus = useAppSelector(getSearchedCamerasStatus);

  const cleanDropdown = () => {
    setSearchValue('');
    setDropdownIsOpened(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isDropdownOpened) {
      setDropdownIsOpened(true);
    }

    setSearchValue(event.target.value);
    debouncedFetchCameras(event.target.value);
  };

  const handleResetButtonClick = () => {
    cleanDropdown();
  };

  const handleListItemClick = (event: SyntheticEvent) => {
    const product = event.target as HTMLInputElement;
    const productId = Number(product.dataset.id);

    dispatch(fetchCameraByIdAction(productId)).unwrap().then(() => {
      navigate(`${AppRoute.Product}/${productId}?${ComponentName.Tab}=${DEFAULT_TABS_TYPE}`);
      cleanDropdown();
    });
  };

  useOnClickOutside(searchRef, cleanDropdown);

  return(
    <div className={`form-search ${isDropdownOpened ? 'list-opened' : ''}`} ref={searchRef}>
      <form>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleInputChange}
            value={searchValue}
          />
        </label>
        <ul className="form-search__select-list scroller">
          {fetchingStatus === FetchStatus.Error && <li className="form-search__select-item" tabIndex={0}> {ErrorMessage.FetchingError} </li> }
          {fetchingStatus === FetchStatus.Loading && <LoadingPage />}
          {fetchingStatus === FetchStatus.Success && !searchedCameras.length && searchValue !== ''
            && <li className="form-search__select-item" tabIndex={0}> {WarningMessage.DataSearchingWarning} </li> }
          { searchedCameras.map((item) => (
            <li
              tabIndex={0}
              className="form-search__select-item"
              key={item.id}
              data-id={item.id}
              onClick={handleListItemClick}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleResetButtonClick}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default FormSearch;
