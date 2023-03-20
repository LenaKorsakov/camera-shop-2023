import { NameSpace } from '../../const/name-space';

import { State } from '../../@types/store-types';

export const getCurrentParams = (state: State): string => state[NameSpace.APP].currentParams;
export const getCamerasCount = (state: State): number => state[NameSpace.APP].camerasCount;
