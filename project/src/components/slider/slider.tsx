import { useState } from 'react';

import CameraCard from '../camera-card/camera-card';

import { CONTENT_PAR_SLIDE, MIN_SLIDE_ITEM_INDEX } from '../../const/const';

import { Cameras } from '../../@types/camera-types';

type SliderProps = {
  cameras: Cameras;
}

function Slider({cameras}: SliderProps): JSX.Element {
  const [firstContentIndex, setFirstContentIndex] = useState<number>(MIN_SLIDE_ITEM_INDEX);
  const productQty = cameras.length;

  const lastContentIndex = firstContentIndex + CONTENT_PAR_SLIDE;

  const changeSlide = (direction: boolean) => {
    setFirstContentIndex((prevState) => {
      if (direction) {
        if (lastContentIndex === productQty) {
          return prevState;
        }
        return prevState + 1;
      } else {
        if (prevState === MIN_SLIDE_ITEM_INDEX) {
          return prevState;
        }
        return prevState - 1;
      }
    });
  };

  const handleButtonNextClick = () => changeSlide(true);

  const handleButtonPrevClick = () => changeSlide(false);

  return (
    <div className="product-similar__slider-list">
      {
        //ниже добавлены стили вручную из-за того, что при использовании класса slider-controls возникает проблема: onClick не отрабатывает
      }
      <div onClick={handleButtonPrevClick} style={{position: 'absolute', top: 'calc(50% - 20px)', left: '0', width: '40px', height: '40px'}}>
        <button
          className="slider-controls slider-controls--prev"
          type="button"
          aria-label="Предыдущий слайд"
          disabled={firstContentIndex === MIN_SLIDE_ITEM_INDEX}
          style={{top: '20px'}}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>

      {cameras.map((camera, index) => (
        <CameraCard
          camera={camera}
          key={camera.id}
          isActive={index >= firstContentIndex && index < lastContentIndex}
        />
      ))}

      {
        //ниже добавлены стили вручную из-за того, что при использовании класса slider-controls возникает проблема: onClick не отрабатывает
      }
      <div onClick={handleButtonNextClick} style={{position: 'absolute', top: 'calc(50% - 20px)', right: '0', width: '40px', height: '40px'}}>
        <button
          className="slider-controls slider-controls--next"
          type="button"
          aria-label="Следующий слайд"
          style={{top: '20px'}}
          disabled={lastContentIndex === productQty}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Slider;
