import { NameSpace } from '../../const/name-space';

import { Camera, Cameras } from '../../@types/camera-types';
import { State } from '../../@types/store-types';
import { FetchStatus } from '../../const/fetch-status';

export const getSelectedCamera = (state: State): Camera => state[NameSpace.ProductData].camera;
export const getProductFetchingStatus = (state: State): FetchStatus => state[NameSpace.ProductData].fetchStatus;
export const getSimilarCameras = (state: State): Cameras => state[NameSpace.ProductData].similarCameras;
