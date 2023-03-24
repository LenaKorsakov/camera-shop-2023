import { ReviewAdapt } from '../@types/review-types';

export const sortReviewByTime = (a: ReviewAdapt, b: ReviewAdapt): number => b.createAt.getTime() - a.createAt.getTime();
