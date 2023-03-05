import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from '../../components/header/header';
import ProductContent from '../../components/product-content/product-content';
import Footer from '../../components/footer/footer';
//import NotFoundPage from '../not-found-page/not-found-page';
import LoadingPage from '../loading-page/loading-page';

import { useAppDispatch } from '../../hooks';
import { fetchReviewAction, fetchSimilarCamerasAction, fetchCameraByIdAction } from '../../store/api-actions/api-actions';
import { store } from '../../store';
import { displayError } from '../../store/actions';

import { WarningMessage } from '../../const/warning-message';

import { Camera } from '../../@types/camera-types';

function ProductPage() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const dispatch = useAppDispatch();

  const { id } = useParams() as { id: string };
  const propId = Number(id);

  useEffect(() => {
    store.dispatch(fetchCameraByIdAction(propId)).unwrap().then(
      (quest) => {
        setSelectedCamera(quest);

        store.dispatch(fetchCameraByIdAction(propId));
        store.dispatch(fetchSimilarCamerasAction(propId));
        store.dispatch(fetchReviewAction(propId));
      },
      () => {
        dispatch(displayError(WarningMessage.DataLoadingWarning));
      });
  }, [dispatch, propId]);


  // if (selectedCamera === null) {
  //   return (<NotFoundPage />);
  // }

  return (
    !selectedCamera ? <LoadingPage/>
      :
      <>
        <Header/>
        <ProductContent/>
        <Footer/>
      </>);
}

export default ProductPage;
