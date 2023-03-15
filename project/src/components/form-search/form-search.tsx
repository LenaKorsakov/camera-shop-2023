import { ChangeEvent, SyntheticEvent, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import LoadingPage from '../../pages/loading-page/loading-page';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraByIdAction, fetchSearchCameraAction } from '../../store/api-actions/api-actions';
import { getSearchedCameras, getSearchedCamerasStatus } from '../../store/catalog-process/catalog-process-selectors';
import { displayError } from '../../store/actions';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';

import { FetchStatus } from '../../const/fetch-status';
import { WarningMessage } from '../../const/warning-message';
import { ErrorMessage } from '../../const/error-message';
import { SEARCH_DELAY } from '../../const/const';
import { AppRoute } from '../../const/app-route';
import { ComponentName } from '../../const/component-name';
import { DEFAULT_TABS_TYPE } from '../../const/tabs-buttons';

function FormSearch(): JSX.Element {
  const dispatch = useAppDispatch();
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const [isDropdownOpened, setDropdownIsOpened] = useState<boolean>(false);
  const [searchedValue, setSearchValue] = useState<string>('');

  const debouncedFetchCameras = useMemo(
    () => debounce((value: string) => {
      dispatch(fetchSearchCameraAction(value));
    }, SEARCH_DELAY), [dispatch]);

  const searchedCameras = useAppSelector(getSearchedCameras);
  const fetchingStatus = useAppSelector(getSearchedCamerasStatus);

  const hideDropdown = () => {
    setSearchValue('');
    setDropdownIsOpened(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;

    if (!isDropdownOpened) {
      setDropdownIsOpened(true);
    }

    setSearchValue(currentValue);

    if (currentValue !== '') {
      debouncedFetchCameras(currentValue);
    }
  };

  const handleResetButtonClick = () => {
    hideDropdown();
  };

  const handleListItemClick = (event: SyntheticEvent) => {
    const product = event.target as HTMLInputElement;
    const productId = Number(product.dataset.id);

    dispatch(fetchCameraByIdAction(productId)).unwrap().then(
      () => {
        navigate(`${AppRoute.Product}/${productId}?${ComponentName.Tab}=${DEFAULT_TABS_TYPE}`);
        hideDropdown();
      },
      () => dispatch(displayError(ErrorMessage.FetchingError))
    );
  };

  useOnClickOutside(searchRef, hideDropdown);
  useKeydownEscClose(hideDropdown);

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
            value={searchedValue}
          />
        </label>
        <ul className="form-search__select-list scroller">
          {fetchingStatus === FetchStatus.Error && <li className="form-search__select-item" tabIndex={0}> {ErrorMessage.FetchingError} </li> }
          {fetchingStatus === FetchStatus.Loading && <LoadingPage />}
          {fetchingStatus === FetchStatus.Success && !searchedCameras.length && searchedValue !== ''
            && <li className="form-search__select-item" tabIndex={0}> {WarningMessage.DataSearchingWarning} </li> }
          {fetchingStatus === FetchStatus.Success && searchedCameras.map((item) => (
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
