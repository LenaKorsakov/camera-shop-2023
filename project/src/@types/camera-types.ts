import { ReviewsRaw } from './review-types';

export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
  reviews: ReviewsRaw;
}


export type Cameras = Camera[];

export type Promo = Pick<Camera, 'id'| 'name'| 'previewImg'| 'previewImg2x'| 'previewImgWebp'| 'previewImgWebp2x'>

export type Size = {
    width: string;
    height: string;
}
