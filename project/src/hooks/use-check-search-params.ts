import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './index';
import { changeSortOrder, changeSortType, resetSortOrder, resetSortType } from '../store/sort-process/sort-process';
import { getCurrentFilterCategory, getCurrentFilterLevels, getCurrentFilterTypes, getPriceFrom, getPriceTo } from '../store/filter-process/filter-process-selectors';
import { resetCurrentFilter, setCurrentFilterCategory, setCurrentFilterLevels, setCurrentFilterTypes, setPriceFrom, setPriceTo } from '../store/filter-process/filter-process';
import { getCurrentSortOrder, getCurrentSortType } from '../store/sort-process/sort-process-selectors';

import { QueryKey } from '../const/query-key';
import { ServerOrderValue } from '../const/sort-order';
import { ServerTypeValue } from '../const/sort-type';
import { UserInput } from '../@types/store-types';


const useCheckSearchParams = () => {
  const dispatch = useAppDispatch();
  const currentFilterCategory = useAppSelector(getCurrentFilterCategory);
  const currentFilterTypes = useAppSelector(getCurrentFilterTypes);
  const currentFilterLevels = useAppSelector(getCurrentFilterLevels);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const currentPriceTo = useAppSelector(getPriceTo);
  const currentPriceFrom = useAppSelector(getPriceFrom);

  const [searchParams] = useSearchParams();

  useEffect (() => {
    const isQueryParamExists = (param: QueryKey) => searchParams && searchParams.has(param);

    if(isQueryParamExists(QueryKey.SortType)) {
      const paramsSortType = searchParams.get(QueryKey.SortType) as ServerTypeValue;
      const isAlreadySelected = currentSortType === paramsSortType;


      if(!isAlreadySelected) {
        dispatch(changeSortType(paramsSortType));
      }
    }

    if(!isQueryParamExists(QueryKey.SortType) && currentSortType !== null) {
      dispatch(resetSortType());//делаем сброс state, когда в адресной строке уже нет query-string с ключом sort_type, а в state значение сохранилось
    }

    if(isQueryParamExists(QueryKey.SortOrder)) {
      const paramsSortOrder = searchParams.get(QueryKey.SortOrder) as ServerOrderValue;
      const isAlreadySelected = currentSortOrder === paramsSortOrder;

      if(!isAlreadySelected) {
        dispatch(changeSortOrder(paramsSortOrder));
      }
    }

    if(!isQueryParamExists(QueryKey.SortOrder) && currentSortOrder !== null) {
      dispatch(resetSortOrder());
    }

    if(isQueryParamExists(QueryKey.PriceFrom)) {
      const paramsPriceFrom = searchParams.get(QueryKey.PriceFrom) as UserInput;
      const isAlreadySelected = currentPriceFrom === paramsPriceFrom;

      if(!isAlreadySelected) {
        dispatch(setPriceFrom(paramsPriceFrom));
      }
    }

    if(isQueryParamExists(QueryKey.PriceTo)) {
      const paramsPriceTo = searchParams.get(QueryKey.PriceTo) as UserInput;
      const isAlreadySelected = currentPriceTo === paramsPriceTo;

      if(!isAlreadySelected) {
        dispatch(setPriceTo(paramsPriceTo));
      }
    }

    if(isQueryParamExists(QueryKey.FilterCategory)) {
      const paramsCategory = searchParams.get(QueryKey.FilterCategory) as string;
      const isAlreadySelected = currentFilterCategory === paramsCategory;

      if (!isAlreadySelected) {
        dispatch(setCurrentFilterCategory(paramsCategory));
      }
    }

    if(!isQueryParamExists(QueryKey.FilterCategory) && currentFilterCategory !== null) {
      dispatch(resetCurrentFilter(QueryKey.FilterCategory));
    }

    if(isQueryParamExists(QueryKey.FilterType)) {
      const paramsType = searchParams.getAll(QueryKey.FilterType);
      paramsType.forEach((value) => {
        const isAlreadySelected = currentFilterTypes.some((type) => type === value);

        if (!isAlreadySelected) {
          dispatch(setCurrentFilterTypes(value));
        }
      });
    }

    if(!isQueryParamExists(QueryKey.FilterType) && currentFilterTypes.length !== 0) {
      dispatch(resetCurrentFilter(QueryKey.FilterType));
    }

    if(isQueryParamExists(QueryKey.FilterLevel)) {
      const paramsLevel = searchParams.getAll(QueryKey.FilterLevel);
      paramsLevel.forEach((value) => {
        const isAlreadySelected = currentFilterLevels.some((level) => level === value);

        if (!isAlreadySelected) {
          dispatch(setCurrentFilterLevels(value));
        }
      });
    }

    if(!isQueryParamExists(QueryKey.FilterLevel) && currentFilterLevels.length !== 0) {
      dispatch(resetCurrentFilter(QueryKey.FilterLevel));
    }

  },[dispatch, searchParams, currentFilterCategory, currentFilterTypes, currentFilterLevels, currentSortOrder, currentSortType, currentPriceFrom, currentPriceTo]);
};

export default useCheckSearchParams;
