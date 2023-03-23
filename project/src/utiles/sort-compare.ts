import { Camera } from '../@types/camera-types';
import { ReviewAdapt } from '../@types/review-types';

export const sortReviewByTime = (a: ReviewAdapt, b: ReviewAdapt): number => b.createAt.getTime() - a.createAt.getTime();
export const sortCamerasByPrice = (a: Camera, b: Camera): number => a.price - b.price;
