import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { StatusCodes } from '../const/status-codes';

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
const REQUEST_TIMEOUT = 5000;

const statusErrors = new Set([StatusCodes.BadRequest, StatusCodes.NotFound]);

const shouldDisplayError = (response: AxiosResponse) => statusErrors.has(response.status);

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });


  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if(error.response && shouldDisplayError(error.response)) {
        toast.warn(`${error.response.data.error}`);
      }

      throw error;
    }
  );

  return api;
};
