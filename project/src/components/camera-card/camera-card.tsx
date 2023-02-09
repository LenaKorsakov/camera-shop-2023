import { Link } from 'react-router-dom';
import { Camera } from '../../@types/camera-types';
import { AppRoute } from '../../const/app-route';
import { capitalizeFirstLetter, formatPrice } from '../../utiles/format';
import IconStar from '../icon-star/icon-star';

const STAR_MAX = 5;

type CameraCardProps = {
isActive: boolean;
camera: Camera;
}

function CameraCard({isActive, camera}: CameraCardProps): JSX.Element {
  const {id, name, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount } = camera;

  const getStarsRating = (): JSX.Element => {
    const stars = [];
    for(let i = 0; i < STAR_MAX; i++) {
      stars.push(<IconStar isFull={i < rating} key={i}/>);
    }
    return <div>{stars}</div> ;
  };

  return (
    <div
      className={`product-card ${isActive ? 'is-active' : ''}`}
    >
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {getStarsRating()}
          {}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {capitalizeFirstLetter(name)}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span> {formatPrice(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
        >
                      Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>
                      Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CameraCard;
