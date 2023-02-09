export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
}

export type Cameras = Camera[];

export type Promo = Pick<Camera, 'id'| 'name'| 'previewImg'| 'previewImg2x'| 'previewImgWebp'| 'previewImgWebp2x'>

