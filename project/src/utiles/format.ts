export const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase().concat(value.slice(1));

export const formatPrice = (value: number) => value.toLocaleString();
