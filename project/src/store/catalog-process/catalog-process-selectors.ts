import { Cameras, Promo } from '../../@types/camera-types';
import { State } from '../../@types/store-types';
import { NameSpace } from '../../const/name-space';

export const getAllCameras = (state: State): Cameras => state[NameSpace.CatalogData].cameras;
export const getCatalogLoadingStatus = (state: State): boolean => state[NameSpace.CatalogData].isLoading;
export const getPromo = (state: State): Promo => state[NameSpace.CatalogData].promo;
