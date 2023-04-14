import { NameSpace } from '../../const/name-space';

import { FetchStatus } from '../../const/fetch-status';
import { State } from '../../@types/store-types';

export const getReviewSendingStatus = (state: State): FetchStatus => state[NameSpace.ReviewData].sendingStatus;
export const getSuccessStatus = (state: State): boolean => state[NameSpace.ReviewData].isSendSuccess;
