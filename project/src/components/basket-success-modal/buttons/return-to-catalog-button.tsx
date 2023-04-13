import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const/app-route';

type ReturnToCatalogButtonProps = {
  onCloseModal: () => void;
  isOnProductOrBasketPage?: boolean;
}
const ReturnToCatalogButton = ({ onCloseModal, isOnProductOrBasketPage }:ReturnToCatalogButtonProps):JSX.Element => {
  const navigate = useNavigate();


  const handleButtonReturnToCatalogClick = () => {
    if (isOnProductOrBasketPage) {
      navigate(AppRoute.Main);
    }

    onCloseModal();
  };

  return (
    <button
      className="btn btn--purple modal__btn modal__btn--fit-width"
      type="button"
      onClick={handleButtonReturnToCatalogClick}
    >
          Вернуться к покупкам
    </button>);
};
export default ReturnToCatalogButton;
