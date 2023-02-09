//import CameraCard from '../camera-card/camera-card';
//TODO map, чтобы сделать компонент видимым надо CameraCard добавить класс is-active передать пропс isActive в компонент
//<CameraCard isActive/>

function CameraSimilar(): JSX.Element {
  return (
    <div className="product-similar__slider">
      <div className="product-similar__slider-list">

      </div>
      <button
        className="slider-controls slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"
        disabled
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <button
        className="slider-controls slider-controls--next"
        type="button"
        aria-label="Следующий слайд"
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
  );
}

export default CameraSimilar;
