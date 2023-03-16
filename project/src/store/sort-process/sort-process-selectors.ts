import { NameSpace } from '../../const/name-space';

import { ServerTypeValue } from '../../const/sort-type';
import { ServerOrderValue } from '../../const/sort-order';

import { State } from '../../@types/store-types';

export const getCurrentSortType = (state: State): ServerTypeValue | null => state[NameSpace.Sort].currentSortType;
export const getCurrentSortOrder = (state: State): ServerOrderValue | null => state[NameSpace.Sort].currentSortOrder;
