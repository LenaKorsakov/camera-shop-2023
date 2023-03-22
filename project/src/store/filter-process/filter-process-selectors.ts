import { NameSpace } from '../../const/name-space';

import { State } from '../../@types/store-types';

export const getCurrentFilterCategory = (state: State): string | null => state[NameSpace.Filter].currentFilterCategory;
export const getCurrentFilterTypes = (state: State): string[] => state[NameSpace.Filter].currentFilterTypes;
export const getCurrentFilterLevels = (state: State): string[] => state[NameSpace.Filter].currentFilterLevels;
