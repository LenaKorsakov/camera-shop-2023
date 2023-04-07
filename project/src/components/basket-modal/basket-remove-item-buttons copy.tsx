import { useAppDispatch } from '../../hooks';
import { removeCameraFromBasket } from '../../store/order-process/order-process';

type BasketRemoveItemButtonsProps = {
  cameraId: number;
  onCloseModal: () => void;
}

const BasketRemoveItemButtons = ({cameraId, onCloseModal}:BasketRemoveItemButtonsProps):JSX.Element => {
  const dispatch = useAppDispatch();

  const handleRemoveItemButtonClick = () => {
    dispatch(removeCameraFromBasket(cameraId));
    onCloseModal();
  };

  return (
    <>
      <button
        className="btn btn--purple modal__btn modal__btn--half-width"
        type="button"
        onClick={handleRemoveItemButtonClick}
      >
        Удалить
      </button>
      <button
        className="btn btn--transparent modal__btn modal__btn--half-width"
        onClick={onCloseModal}
      >
        Продолжить покупки
      </button>
    </>);
};
export default BasketRemoveItemButtons;
