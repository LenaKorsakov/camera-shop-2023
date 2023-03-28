import './form-search.css';
import { ChangeEvent, KeyboardEvent, SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import { fetchCameraByIdAction, fetchSearchCameraAction } from '../../store/api-actions/api-actions';
import { getSearchedCameras, getSearchedCamerasStatus } from '../../store/catalog-process/catalog-process-selectors';
import { displayError } from '../../store/actions';

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

function FormSearch(): JSX.Element {
  const dispatch = useAppDispatch();
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');

  const [isDropdownOpened, setDropdownIsOpened] = useState<boolean>(false);
  const [searchedValue, setSearchValue] = useState<string>('');
  const [currentProductIndex, setCurrentProductIndex] = useState<number>(0);

  const debouncedFetchCameras = useMemo(
    () => debounce((value: string) => {
      dispatch(fetchSearchCameraAction(value));
    }, SEARCH_DELAY), [dispatch]);

  const searchedCameras = useAppSelector(getSearchedCameras);
  const fetchingStatus = useAppSelector(getSearchedCamerasStatus);
  const searchCamerasQnt = searchedCameras.length;

  useEffect(() => {
    if (searchCamerasQnt && arrowUpPressed) {
      setCurrentProductIndex((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [arrowUpPressed, searchCamerasQnt]);

  useEffect(() => {
    if (searchCamerasQnt && arrowDownPressed) {
      setCurrentProductIndex((prevState) => (prevState < searchCamerasQnt - 1 ? prevState + 1 : prevState ));
    }
  }, [arrowDownPressed, searchCamerasQnt]);

  const resetDropdown = () => {
    setSearchValue('');
    setDropdownIsOpened(false);
    setCurrentProductIndex(0);
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

  const navigateToCurrentProduct = (id: number) => {
    dispatch(fetchCameraByIdAction(id)).unwrap().then(
      () => {
        navigate(`${AppRoute.Product}/${id}?${ComponentName.Tab}=${DEFAULT_TABS_TYPE}`);
        resetDropdown();
      },
      () => dispatch(displayError(ErrorMessage.FetchingError))
    );
  };

  const handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (searchedCameras) {
        const selectedCamera = searchedCameras[currentProductIndex];
        const productId = selectedCamera.id;

        navigateToCurrentProduct(productId);
      }
    }
  };

  const handleListItemClick = (event: SyntheticEvent) => {
    const product = event.target as HTMLLIElement;
    const productId = Number(product.dataset.id);

    navigateToCurrentProduct(productId);
  };

  const handleListItemKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const product = event.target as HTMLLIElement;
      const productId = Number(product.dataset.id);

      navigateToCurrentProduct(productId);
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
          {fetchingStatus === FetchStatus.Success && searchedCameras.map((item, i) => (
            <li
              tabIndex={0}
              className={`form-search__select-item ${ i === currentProductIndex ? 'form-search__select-item--active' : ''}`}
              key={item.id}
              data-id={item.id}
              onClick={handleListItemClick}
              onKeyDown={handleListItemKeydown}
              data-testid='list-item'
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
