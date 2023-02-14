export const PictureSize = {
  PREVIEW_PICTURE: {
    width: 280,
    height: 240
  },
  PROMO_PICTURE: {
    width: 1280,
    height: 280
  },
  PRODUCT_PICTURE: {
    width: 560,
    height: 480
  },
  BASKET_PICTURE: {
    width: 140,
    height: 120
  },
} as const;

export type PictureSizeEnum = typeof PictureSize[keyof typeof PictureSize];
