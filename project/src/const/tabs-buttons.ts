type TabsButton = {
  title: string;
  type: string;
}

enum TabsButtonsTitle {
  Features = 'Характеристики',
  Description = 'Описание'
}

export enum TabType {
  Features = 'features',
  Description = 'description'
}
export const TABS_BUTTONS: TabsButton[] = [
  {title: TabsButtonsTitle.Features, type: TabType.Features},
  {title: TabsButtonsTitle.Description, type: TabType.Description},
];

export enum FeaturesTitle {
  VendorCode = 'Артикул',
  Category = 'Категория',
  Type = 'Тип камеры',
  Level = 'Уровень'
}

export const DEFAULT_TABS_TYPE = TabType.Features;
export const DEFAULT_TABS_TITLE = TabsButtonsTitle.Description;
