import './search-form.css';
import { ChangeEvent, KeyboardEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import { fetchSearchCameraAction } from '../../store/api-actions/api-actions';
import { getSearchedCameras, getSearchedCamerasStatus } from '../../store/catalog-process/catalog-process-selectors';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';
import useKeyPress from '../../hooks/use-key-press';

import { DEFAULT_TABS_TYPE } from '../../const/tabs-buttons';
import { SEARCH_DELAY } from '../../const/const';
import { FetchStatus } from '../../const/fetch-status';
import { WarningMessage } from '../../const/warning-message';
import { ErrorMessage } from '../../const/error-message';
import { AppRoute } from '../../const/app-route';
import { ComponentName } from '../../const/component-name';
import ListItem from './list-item';

function SearchForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const searchRef = useRef(null);

  const navigate = useNavigate();

  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');

  const [isDropdownOpened, setDropdownIsOpened] = useState<boolean>(false);
  const [searchedValue, setSearchValue] = useState<string>('');
  const [currentProductIndex, setCurrentProductIndex] = useState<number>(-1);
  // eslint-disable-next-line no-console
  console.log(currentProductIndex);

  const debouncedFetchCameras = useMemo(
    () => debounce((value: string) => {
      dispatch(fetchSearchCameraAction(value));
    }, SEARCH_DELAY), [dispatch]);

  const searchedCameras = useAppSelector(getSearchedCameras);
  const fetchingStatus = useAppSelector(getSearchedCamerasStatus);
  const searchCamerasAmount = searchedCameras.length;

  useEffect(() => {
    if (searchCamerasAmount && arrowUpPressed) {
      setCurrentProductIndex((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [arrowUpPressed, searchCamerasAmount]);

  useEffect(() => {
    if (searchCamerasAmount && arrowDownPressed) {
      setCurrentProductIndex((prevState) => (prevState < searchCamerasAmount - 1 ? prevState + 1 : prevState ));
    }
  }, [arrowDownPressed, searchCamerasAmount]);

  const resetDropdown = () => {
    setSearchValue('');
    setDropdownIsOpened(false);
    setCurrentProductIndex(0);
    setCurrentProductIndex(-1);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;

    if (!isDropdownOpened) {
      setDropdownIsOpened(true);
    }

    setSearchValue(currentValue);

    if (currentValue !== '') {
      debouncedFetchCameras(currentValue);
    } else {
      setDropdownIsOpened(false);
    }
  };

  const handleResetButtonClick = () => {
    resetDropdown();
  };

  const navigateToCurrentProductPage = useCallback((id: number) => {
    navigate(`${AppRoute.Product}/${id}?${ComponentName.Tab}=${DEFAULT_TABS_TYPE}`);
    resetDropdown();
  },[navigate]);

  const handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (searchedCameras) {
        const selectedCamera = searchedCameras[currentProductIndex];
        const productId = selectedCamera.id;

        navigateToCurrentProductPage(productId);
      }
    }
  };

  useOnClickOutside(searchRef, resetDropdown);
  useKeydownEscClose(resetDropdown);

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
            onKeyDown={handleInputKeyDown}
          />
        </label>
        <ul className="form-search__select-list scroller">
          {fetchingStatus === FetchStatus.Error && <li className="form-search__select-item" tabIndex={0}> {ErrorMessage.FetchingError} </li> }
          {fetchingStatus === FetchStatus.Loading && <li className="form-search__select-item" tabIndex={0}> {WarningMessage.LoadingWarning} </li>}
          {fetchingStatus === FetchStatus.Success && !searchedCameras.length && searchedValue !== ''
            && <li className="form-search__select-item" tabIndex={0}> {WarningMessage.DataEmptySearchingWarning} </li> }
          {fetchingStatus === FetchStatus.Success && searchedCameras.map((item, i) => {
            const isFocused = i === currentProductIndex;

            return(
              <ListItem
                key={item.id}
                isFocused={isFocused}
                onNavigateToCurrentProductPage={navigateToCurrentProductPage}
                item={item}
              />
            );
          })}
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

export default memo(SearchForm);
