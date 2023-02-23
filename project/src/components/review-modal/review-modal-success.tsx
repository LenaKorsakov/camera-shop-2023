import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

function ReviewModalSuccess (): JSX.Element {
  const navigate = useNavigate();
  const handleButtonClick = () => navigate(AppRoute.Main);

  return(
    <>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleButtonClick}
        >
          Вернуться к покупкам
        </button>
      </div>
    </>


  );
}
export default ReviewModalSuccess;
