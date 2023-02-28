import {PayloadAction} from '@reduxjs/toolkit';
import {Middleware} from 'redux';

import browserHistory from '../../browser-history';

import {rootReducer} from '../root-reducer';

import { Action } from '../../const/action';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === Action.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
