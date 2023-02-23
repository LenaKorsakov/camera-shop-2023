export const Action = {
  FetchAllCameras: 'catalog/fetchAllCameras',
  FetchBanner: 'catalog/fetchBanner',

  FetchCameraById: 'product/fetchCameraById',
  FetchReviewsById: 'product/fetchReviewsById',
  SendReview: 'product/sendReview',
  FetchSimilarCameras: 'product/fetchSimilarCameras',

  SendCoupon: 'order/sendCoupon',
  SendOrder: 'order/sendOrder',

  DisplayError: 'app/displayError'
} as const;
