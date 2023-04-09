import { Camera } from '../../../@types/camera-types';
import { useAppDispatch } from '../../../hooks';
import { addCameraToBasket } from '../../../store/order-process/order-process';

type AddItemButtonProps = {
  camera: Camera;
  onCloseModal: () => void;
  onOpenSuccessModal: () => void;
}
const AddItemButton = ({camera, onCloseModal, onOpenSuccessModal}:AddItemButtonProps):JSX.Element => {
  const dispatch = useAppDispatch();

  const handleButtonAddToBasketClick = () => {
    dispatch(addCameraToBasket(camera));
    onCloseModal();
    onOpenSuccessModal();
  };

  return (
    <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleButtonAddToBasketClick}>
      <svg width="24" height="16" aria-hidden="true">
        <use xlinkHref="#icon-add-basket"></use>
      </svg>
      Добавить в корзину
    </button>);
};
export default AddItemButton;
