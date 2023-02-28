export const Action = {
  FetchAllCameras: 'catalog/fetchAllCameras',
  FetchBanner: 'catalog/fetchBanner',

  FetchCameraById: 'product/fetchCameraById',
  FetchSimilarCameras: 'product/fetchSimilarCameras',

  FetchReviewsById: 'review/fetchReviewsById',
  SendReview: 'review/sendReview',

  SendCoupon: 'order/sendCoupon',
  SendOrder: 'order/sendOrder',

  DisplayError: 'app/displayError'
} as const;
