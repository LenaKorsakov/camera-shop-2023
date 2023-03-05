import { memo, SyntheticEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import TabDescription from './tab-description/tab-description';
import TabFeatures from './tab-features/tab-features';

import { TabType, TABS_BUTTONS, DEFAULT_TABS_TITLE } from '../../const/tabs-buttons';
import { AppRoute } from '../../const/app-route';
import { ComponentName } from '../../const/component-name';

import { Camera } from '../../@types/camera-types';

type TabsProps = {
  camera: Camera;
}

function Tabs({camera}: TabsProps): JSX.Element {
  const { id } = useParams() as { id: string };

  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  // eslint-disable-next-line no-console
  console.log(tab);

  const isTab = tab === null || (tab !== TabType.Features && tab !== TabType.Description);
  const navigate = useNavigate();

  const handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    navigate({
      pathname: `${AppRoute.Product}/${id}`,
      search: `?${ComponentName.Tab}=${event.currentTarget.dataset.tab as string}`,
    });
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">

        {TABS_BUTTONS.map(({title, type}) => {
          const isActive = type === tab;

          return (
            <button
              className={`tabs__control ${isActive || (isTab && title === DEFAULT_TABS_TITLE ) ? 'is-active' : ''}`}
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
          {tab === TabType.Features ?
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
