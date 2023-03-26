import { NameSpace } from '../../const/name-space';

import { State, UserInput } from '../../@types/store-types';

export const getCurrentFilterByCategory = (state: State): string | null => state[NameSpace.Filter].currentFilterCategory;
export const getCurrentFiltersByTypes = (state: State): string[] => state[NameSpace.Filter].currentFilterTypes;
export const getCurrentFiltersByLevels = (state: State): string[] => state[NameSpace.Filter].currentFilterLevels;

export const getCamerasMinPrice = (state: State): number => state[NameSpace.Filter].minPrice;
export const getCamerasMaxPrice = (state: State): number => state[NameSpace.Filter].maxPrice;

export const getUserEnteredBottomPrice = (state: State): UserInput => state[NameSpace.Filter].bottomPrice;
export const getUserEnteredTopPrice = (state: State): UserInput => state[NameSpace.Filter].topPrice;
