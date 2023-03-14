export const Action = {
  FetchAllCameras: 'catalog/fetchAllCameras',
  FetchSearchCameras: 'catalog/fetchSearchCameras',
  FetchPromo: 'catalog/fetchPromo',

  FetchCameraById: 'product/fetchCameraById',
  FetchSimilarCameras: 'product/fetchSimilarCameras',

  FetchReviewsById: 'review/fetchReviewsById',
  SendReview: 'review/sendReview',

  SendCoupon: 'order/sendCoupon',
  SendOrder: 'order/sendOrder',

  DisplayError: 'app/displayError',
  RedirectToRoute: 'app/redirectToRoute)'
} as const;
