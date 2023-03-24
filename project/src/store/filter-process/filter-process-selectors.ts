import { NameSpace } from '../../const/name-space';

import { State, UserInput } from '../../@types/store-types';

export const getCurrentFilterCategory = (state: State): string | null => state[NameSpace.Filter].currentFilterCategory;
export const getCurrentFilterTypes = (state: State): string[] => state[NameSpace.Filter].currentFilterTypes;
export const getCurrentFilterLevels = (state: State): string[] => state[NameSpace.Filter].currentFilterLevels;

export const getMinPrice = (state: State): number => state[NameSpace.Filter].minPrice;
export const getMaxPrice = (state: State): number => state[NameSpace.Filter].maxPrice;

export const getPriceFrom = (state: State): UserInput => state[NameSpace.Filter].priceFrom;
export const getPriceTo = (state: State): UserInput => state[NameSpace.Filter].priceTo;
