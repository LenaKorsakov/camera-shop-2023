import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const/app-route';

type ReturnToCatalogButtonProps = {
  onCloseModal: () => void;
  isOnProductPage?: boolean;
}
const ReturnToCatalogButton = ({ onCloseModal, isOnProductPage }:ReturnToCatalogButtonProps):JSX.Element => {
  const navigate = useNavigate();


  const handleButtonReturnToCatalogClick = () => {
    if (isOnProductPage) {
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
