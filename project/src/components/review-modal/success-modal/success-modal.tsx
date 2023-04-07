import { useNavigate } from 'react-router-dom';

import { AppRoute } from '../../../const/app-route';
import { ComponentName } from '../../../const/component-name';
import { DEFAULT_TABS_TYPE } from '../../../const/tabs-buttons';

type SuccessModalProps = {
  cameraId: number;
  onButtonClick: () => void;
}

function SuccessModal ({cameraId, onButtonClick}: SuccessModalProps): JSX.Element {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate({
      pathname: `${AppRoute.Product}/${cameraId}`,
      search: `?${ComponentName.Tab}=${DEFAULT_TABS_TYPE}`,
    });

    onButtonClick();
  };

  return(
    <>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true" data-testid='success'>
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
export default SuccessModal;
