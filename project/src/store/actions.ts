import { createAction } from '@reduxjs/toolkit';
import { Action } from '../const/action';

export const displayError = createAction<string>(Action.DisplayError);
