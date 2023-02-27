import { memo } from 'react';

type TabDescriptionProps = {
  description: string;
}
function TabDescription({ description }: TabDescriptionProps): JSX.Element {
  return (
    <div className="product__tabs-text">
      <p>{description}</p>
    </div>
  );
}

export default memo(TabDescription);
