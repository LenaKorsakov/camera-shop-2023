import { memo } from 'react';

import Slider from '../slider/slider';

import { Cameras } from '../../@types/camera-types';

type SimilarCameraListProps = {
  cameras: Cameras;
  onAddCameraInBasketButtonClick: () => void;
}

function SimilarCamerasBlock({cameras, onAddCameraInBasketButtonClick}: SimilarCameraListProps): JSX.Element {
  return (
    <div className="container">
      <h2 className="title title--h3">Похожие товары</h2>
      <div className="product-similar__slider">
        <Slider
          onAddCameraInBasketButtonClick={onAddCameraInBasketButtonClick}
          cameras={cameras}
        />
      </div>
    </div>
  );
}

export default memo(SimilarCamerasBlock);
