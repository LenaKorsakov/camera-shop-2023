import { store } from '../store/index';
import { Cameras, Promo } from './camera-types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CatalogData = {
  cameras: Cameras;
  promo: Promo;
  isLoading: boolean;
}


