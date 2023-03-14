import { NameSpace } from '../../const/name-space';
import { FetchStatus } from '../../const/fetch-status';

import { State } from '../../@types/store-types';
import { Cameras, Promo } from '../../@types/camera-types';

export const getAllCameras = (state: State): Cameras => state[NameSpace.CatalogData].cameras;
export const getCatalogLoadingStatus = (state: State): boolean => state[NameSpace.CatalogData].isLoading;

export const getPromo = (state: State): Promo => state[NameSpace.CatalogData].promo;

export const getSearchedCameras = (state: State): Cameras => state[NameSpace.CatalogData].searchCameras;
export const getSearchedCamerasStatus = (state: State): FetchStatus => state[NameSpace.CatalogData].fetchingStatus;
