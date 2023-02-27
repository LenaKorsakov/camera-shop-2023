type TabsButton = {
  title: string;
  type: string;
}

export enum TabsButtonsTitles {
  Features = 'Характеристики',
  Description = 'Описание'
}

export enum TabType {
  Features = 'features',
  Description = 'description',
}
export const TUBS_BUTTONS: TabsButton[] = [
  {title: TabsButtonsTitles.Features, type: TabType.Features},
  {title: TabsButtonsTitles.Description, type: TabType.Description},
];
