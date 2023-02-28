import { memo } from 'react';

import { Camera } from '../../@types/camera-types';
import { FeaturesTitles } from '../../const/tabs-buttons';

type TabFeaturesProps = {
  camera: Camera;
}
function TabFeatures({ camera }: TabFeaturesProps): JSX.Element {
  const { category, type, vendorCode, level } = camera;

  const FeaturesItem = {
    vendorCode,
    category,
    type,
    level
  } as const;

  return (
    <ul className="product__tabs-list">
      {Object.values(FeaturesTitles).map((title, index) => {
        const item = Object.values(FeaturesItem)[index];
        return (
          <li
            key={title}
            className="item-list"
          >
            <span className="item-list__title">{title}:</span>
            <p className="item-list__text">{item}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(TabFeatures);
