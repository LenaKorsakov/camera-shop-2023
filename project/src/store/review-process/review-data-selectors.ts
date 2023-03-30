import { NameSpace } from '../../const/name-space';

import { State } from '../../@types/store-types';
import { FetchStatus } from '../../const/fetch-status';

export const getReviewSendingStatus = (state: State): FetchStatus => state[NameSpace.ReviewData].sendingStatus;
export const getSuccessStatus = (state: State): boolean => state[NameSpace.ReviewData].isSendSuccess;
