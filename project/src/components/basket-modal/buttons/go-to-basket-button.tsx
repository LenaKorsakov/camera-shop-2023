import { useNavigate } from 'react-router-dom';

import { AppRoute } from '../../../const/app-route';
import { MIN_PAGE_NUMBER } from '../../../const/const';

type GoToBasketButtonsProps = {
  onCloseModal: () => void;
  isOnProductPage?: boolean;
}

const GoToBasketButtons = ({ onCloseModal, isOnProductPage}: GoToBasketButtonsProps):JSX.Element => {
  const navigate = useNavigate();

  const handleCloseButtonClick = () => {
    if (isOnProductPage) {
      navigate(`${AppRoute.Catalog}${MIN_PAGE_NUMBER}`);
    }

    onCloseModal();
  };

  const handleGoToBasketClick = () => {
    navigate(AppRoute.Basket);
    onCloseModal();
  };

  return (
    <>
      <button
        className="btn btn--transparent modal__btn"
        onClick={handleCloseButtonClick}
      >
        Продолжить покупки
      </button>

      <button
        className="btn btn--purple modal__btn modal__btn--fit-width"
        onClick={handleGoToBasketClick}
      >
          Перейти в корзину
      </button>
    </>);
};
export default GoToBasketButtons;
