import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import ProductContent from '../../components/product-content/product-content';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSimilarCamerasAction, fetchCameraByIdAction } from '../../store/api-actions/api-actions';

import { getSelectedCamera } from '../../store/product-process/product-data-selectors';

function ProductPage() {
  const dispatch = useAppDispatch();

  const { id } = useParams() as { id: string };

  const camera = useAppSelector(getSelectedCamera);

  useEffect(() => {
    if (id) {
      const propId = Number(id);

      dispatch(fetchCameraByIdAction(propId));
      dispatch(fetchSimilarCamerasAction(propId));
    }
  }, [dispatch, id]);


  return (
    <ProductContent camera={camera}/>);
}

export default ProductPage;
