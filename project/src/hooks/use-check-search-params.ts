import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from './index';
import { changeSortOrder, changeSortType } from '../store/sort-process/sort-process';

import { Query } from '../const/query';
import { ServerOrderValue } from '../const/sort-order';
import { ServerTypeValue } from '../const/sort-type';


const useCheckSearchParams = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect (() => {
    const isQueryParamExists = (param: Query) => searchParams && searchParams.has(param);

    if(isQueryParamExists(Query.SortType)) {
      dispatch(changeSortType(searchParams.get(Query.SortType) as ServerTypeValue));
    }

    if(isQueryParamExists(Query.SortOrder)) {
      dispatch(changeSortOrder(searchParams.get(Query.SortOrder) as ServerOrderValue));
    }

  },[dispatch, searchParams]);
};

export default useCheckSearchParams;
