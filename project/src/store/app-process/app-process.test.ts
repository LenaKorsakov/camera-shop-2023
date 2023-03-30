import { appProcess, initialStateApp, setCurrentParams } from './app-process';

import { UNKNOWN_ACTION } from '../../utils/mock';

import { AppData } from '../../@types/store-types';

const FAKE_PARAMS = '111';

describe('Reducer: appProcess', () => {
  let state: AppData;

  beforeEach(() => {
    state = initialStateApp;
  });
  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should update currentParams if dispatch setCurrentParams', () => {
    expect(appProcess.reducer(state, {type: setCurrentParams.type, payload: FAKE_PARAMS}))
      .toEqual({...state, currentParams: FAKE_PARAMS});
  });
});
