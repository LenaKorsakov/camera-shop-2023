import { memo, useCallback, useState } from 'react';

import TabButton from './tab-button';
import TabDescription from './tab-description';
import TabCharacteristics from './tab-characteristics';

import { TabsButtonsTitles } from '../../const/tabs-buttons-titles';

import { Camera } from '../../@types/camera-types';

type TabsProps = {
  camera: Camera;
}
function Tabs({camera}: TabsProps): JSX.Element {
  const [isCharacteristicsActive, setIsCharacteristicsActive] = useState<boolean>(false);
  const [isDescriptionActive, setIsDescriptionActive] = useState<boolean>(true);

  const handleCharacteristicsButtonClick = useCallback(() => {
    setIsCharacteristicsActive(true);
    setIsDescriptionActive(false);
  },[]);

  const handleDescriptionButtonClick = useCallback(() => {
    setIsDescriptionActive(true);
    setIsCharacteristicsActive(false);
  },[]);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <TabButton
          onClick={handleCharacteristicsButtonClick}
          isActive={isCharacteristicsActive}
          title={TabsButtonsTitles.Characteristics}
        />
        <TabButton
          onClick={handleDescriptionButtonClick}
          isActive={isDescriptionActive}
          title={TabsButtonsTitles.Description}
        />
      </div>
      <div className="tabs__content">
        <TabCharacteristics
          camera={camera}
          isActive={isCharacteristicsActive}
        />
        <TabDescription
          description={camera.description}
          isActive={isDescriptionActive}
        />
      </div>
    </div>
  );
}

export default memo(Tabs);
