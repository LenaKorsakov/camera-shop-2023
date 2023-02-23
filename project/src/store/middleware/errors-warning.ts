import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Action } from '../../const/action';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const errorsWarning: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === Action.DisplayError) {
          toast.warn(action.payload);
        }

        return next(action);
      };
