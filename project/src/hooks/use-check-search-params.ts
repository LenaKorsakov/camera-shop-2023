import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './index';
import { changeSortOrder, changeSortType } from '../store/sort-process/sort-process';
import { getCurrentFilterCategory, getCurrentFilterLevels, getCurrentFilterTypes } from '../store/filter-process/filter-process-selectors';
import { setCurrentFilterCategory, setCurrentFilterLevels, setCurrentFilterTypes } from '../store/filter-process/filter-process';
import { getCurrentSortOrder, getCurrentSortType } from '../store/sort-process/sort-process-selectors';

import { Query } from '../const/query';
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
    const isQueryParamExists = (param: Query) => searchParams && searchParams.has(param);

    if(isQueryParamExists(Query.SortType)) {
      const paramsSortType = searchParams.get(Query.SortType) as ServerTypeValue;
      const isAlreadySelected = currentSortType === paramsSortType;

      if(!isAlreadySelected) {
        dispatch(changeSortType(searchParams.get(Query.SortType) as ServerTypeValue));
      }
    }

    if(isQueryParamExists(Query.SortOrder)) {
      const paramsSortOrder = searchParams.get(Query.SortOrder) as ServerOrderValue;
      const isAlreadySelected = currentSortOrder === paramsSortOrder;

      if(!isAlreadySelected) {
        dispatch(changeSortOrder(searchParams.get(Query.SortOrder) as ServerOrderValue));
      }
    }

    if(isQueryParamExists(Query.FilterCategory)) {
      const paramsCategory = searchParams.get(Query.FilterCategory) as string;
      const isAlreadySelected = currentFilterCategory === paramsCategory;

      if (!isAlreadySelected) {
        dispatch(setCurrentFilterCategory(paramsCategory));
      }
    }

    if(isQueryParamExists(Query.FilterType)) {
      const paramsType = searchParams.getAll(Query.FilterType);
      paramsType.forEach((value) => {
        const isAlreadySelected = currentFilterTypes.some((type) => type === value);

        if (!isAlreadySelected) {
          dispatch(setCurrentFilterTypes(value));
        }
      });
    }

    if(isQueryParamExists(Query.FilterLevel)) {
      const paramsLevel = searchParams.getAll(Query.FilterLevel);
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
