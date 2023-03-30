import { UserInput } from '../@types/store-types';

export const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase().concat(value.slice(1));

export const formatPrice = (value: UserInput) => value.toLocaleString();

export const formatReviewDate = (date: Date, locales = 'ru-RU') => date.toLocaleString(locales, {day: 'numeric', month: 'long'});

