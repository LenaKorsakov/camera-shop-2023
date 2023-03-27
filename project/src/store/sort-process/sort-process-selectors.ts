import { NameSpace } from '../../const/name-space';

import { SortByTypeServerValue } from '../../const/sort-by-type';
import { SortByOrderServerValue } from '../../const/sort-by-order';

import { State } from '../../@types/store-types';

export const getCurrentSortType = (state: State): SortByTypeServerValue | null => state[NameSpace.Sort].currentSortType;
export const getCurrentSortOrder = (state: State): SortByOrderServerValue | null => state[NameSpace.Sort].currentSortOrder;
