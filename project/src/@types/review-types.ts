interface Review {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  cameraId: number;
}

export interface ReviewRaw extends Review {
  createAt: string;
}

export type ReviewsRaw = ReviewRaw[];

export interface ReviewAdapt extends Review {
  createAt: Date;
}

export type ReviewsAdapt = ReviewAdapt[];

export type ReviewPost = Pick<Review,'userName'|'advantage'|'disadvantage'|'review'|'rating'|'cameraId'>
