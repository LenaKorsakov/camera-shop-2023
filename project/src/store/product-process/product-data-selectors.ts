import { NameSpace } from '../../const/name-space';

import { Camera, Cameras } from '../../@types/camera-types';
import { State } from '../../@types/store-types';

export const getSelectedCamera = (state: State): Camera => state[NameSpace.ProductData].camera;
export const getProductLoadingStatus = (state: State): boolean => state[NameSpace.ProductData].isLoading;
export const getSimilarCameras = (state: State): Cameras => state[NameSpace.ProductData].similarCameras;
