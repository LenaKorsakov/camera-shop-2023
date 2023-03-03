import { useState } from 'react';

import CameraCard from '../camera-card/camera-card';

import { MIN_SLIDE_ITEM_INDEX } from '../../const/const';
import { ContentPerItem } from '../../const/content-per-item';

import { Cameras } from '../../@types/camera-types';

type SliderProps = {
  cameras: Cameras;
}

function Slider({cameras}: SliderProps): JSX.Element {
  const [firstContentIndex, setFirstContentIndex] = useState<number>(MIN_SLIDE_ITEM_INDEX);
  const productQty = cameras.length;

  const lastContentIndex = firstContentIndex + ContentPerItem.Slider;

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

  const isPrev = firstContentIndex === MIN_SLIDE_ITEM_INDEX;
  const isNext = lastContentIndex === productQty;

  return (
    <div className="product-similar__slider-list">
      <button
        data-testid="prev"
        className="slider-controls slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"
        disabled={isPrev}
        style={{pointerEvents: isPrev ? 'none' : 'auto'}}
        onClick={handleButtonPrevClick}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>

      {cameras.map((camera, index) => (
        <CameraCard
          camera={camera}
          key={camera.id}
          isActive={index >= firstContentIndex && index < lastContentIndex}
        />
      ))}

      <button
        data-testid="next"
        className="slider-controls slider-controls--next"
        type="button"
        aria-label="Следующий слайд"
        disabled={isNext}
        style={{pointerEvents: isNext ? 'none' : 'auto'}}
        onClick={handleButtonNextClick}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow"/>
        </svg>
      </button>
    </div>
  );
}

export default Slider;
