import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './index';
import { changeSortOrder, changeSortType } from '../store/sort-process/sort-process';
import { getCurrentFilterCategory, getCurrentFilterLevels, getCurrentFilterTypes } from '../store/filter-process/filter-process-selectors';
import { setCurrentFilterCategory, setCurrentFilterLevels, setCurrentFilterTypes } from '../store/filter-process/filter-process';
import { getCurrentSortOrder, getCurrentSortType } from '../store/sort-process/sort-process-selectors';

import { QueryKey } from '../const/query-key';
import { ServerOrderValue } from '../const/sort-order';
import { ServerTypeValue } from '../const/sort-type';


const useCheckSearchParams = () => {
  const dispatch = useAppDispatch();
  const currentFilterCategory = useAppSelector(getCurrentFilterCategory);
  const currentFilterTypes = useAppSelector(getCurrentFilterTypes);
  const currentFilterLevels = useAppSelector(getCurrentFilterLevels);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);

  const [searchParams] = useSearchParams();

  useEffect (() => {
    const isQueryParamExists = (param: QueryKey) => searchParams && searchParams.has(param);

    if(isQueryParamExists(QueryKey.SortType)) {
      const paramsSortType = searchParams.get(QueryKey.SortType) as ServerTypeValue;
      const isAlreadySelected = currentSortType === paramsSortType;

      if(!isAlreadySelected) {
        dispatch(changeSortType(searchParams.get(QueryKey.SortType) as ServerTypeValue));
      }
    }

    if(isQueryParamExists(QueryKey.SortOrder)) {
      const paramsSortOrder = searchParams.get(QueryKey.SortOrder) as ServerOrderValue;
      const isAlreadySelected = currentSortOrder === paramsSortOrder;

      if(!isAlreadySelected) {
        dispatch(changeSortOrder(searchParams.get(QueryKey.SortOrder) as ServerOrderValue));
      }
    }

    if(isQueryParamExists(QueryKey.FilterCategory)) {
      const paramsCategory = searchParams.get(QueryKey.FilterCategory) as string;
      const isAlreadySelected = currentFilterCategory === paramsCategory;

      if (!isAlreadySelected) {
        dispatch(setCurrentFilterCategory(paramsCategory));
      }
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

    if(isQueryParamExists(QueryKey.FilterLevel)) {
      const paramsLevel = searchParams.getAll(QueryKey.FilterLevel);
      paramsLevel.forEach((value) => {
        const isAlreadySelected = currentFilterLevels.some((level) => level === value);

        if (!isAlreadySelected) {
          dispatch(setCurrentFilterLevels(value));
        }
      });
    }

  },[dispatch, searchParams, currentFilterCategory, currentFilterTypes, currentFilterLevels, currentSortOrder, currentSortType]);
};

export default useCheckSearchParams;
