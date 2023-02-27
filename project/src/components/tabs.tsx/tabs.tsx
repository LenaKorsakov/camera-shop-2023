import { memo, SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TabDescription from './tab-description';
import TabFeatures from './tab-features';

import { TabType, TUBS_BUTTONS } from '../../const/tabs-buttons';
import { AppRoute } from '../../const/app-route';

import { Camera } from '../../@types/camera-types';

type TabsProps = {
  camera: Camera;
}
function Tabs({camera}: TabsProps): JSX.Element {
  const params = useParams() as { id: string; tab: string};
  const navigate = useNavigate();
  const { id, tab } = params;

  const handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {

    navigate(`${AppRoute.Product}/${id}/${event.currentTarget.dataset.tab as string}`);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">

        {TUBS_BUTTONS.map(({title, type}) => {
          const isActive = type === tab;

          return (
            <button
              className={`tabs__control ${isActive ? 'is-active' : ''}`}
              type="button"
              onClick={handleButtonClick}
              data-tab={type}
              key={type}
            >
              {title}
            </button>
          );
        }) }
      </div>
      <div className="tabs__content">
        <div className="tabs__element is-active">
          {tab === TabType.Description ?
            <TabFeatures
              camera={camera}
            />
            :
            <TabDescription
              description={camera.description}
            /> }
        </div>
      </div>
    </div>
  );
}

export default memo(Tabs);
