import { memo } from 'react';

import { capitalizeFirstLetter } from '../../utiles/format';

import { Camera } from '../../@types/camera-types';

type TabFeaturesProps = {
  camera: Camera;
}
function TabFeatures({ camera }: TabFeaturesProps): JSX.Element {
  const { category, type, vendorCode, level } = camera;

  return (
    <ul className="product__tabs-list">
      <li className="item-list">
        <span className="item-list__title">Артикул:</span>
        <p className="item-list__text">{vendorCode}</p>
      </li>
      <li className="item-list">
        <span className="item-list__title">Категория:</span>
        <p className="item-list__text">{capitalizeFirstLetter(category)}</p>
      </li>
      <li className="item-list">
        <span className="item-list__title">Тип камеры:</span>
        <p className="item-list__text">{capitalizeFirstLetter(type)}</p>
      </li>
      <li className="item-list">
        <span className="item-list__title">Уровень:</span>
        <p className="item-list__text">{capitalizeFirstLetter(level)}</p>
      </li>
    </ul>
  );
}

export default memo(TabFeatures);
