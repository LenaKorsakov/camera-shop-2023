import { AppRoute } from './app-route';

type NavigationItem = {
  title: string;
  route: AppRoute | string;
}

export type NavigationItems = NavigationItem[];

export type FooterColumn = {
  name: string;
  items: NavigationItems;
}

export const ResourcesItemsTitles = {
  Learning: 'Курсы операторов',
  Blog: 'Блог',
  Comunity: 'Сообщество',
} as const;

export const RESOURCES_ITEMS: NavigationItems = [
  {title: ResourcesItemsTitles.Learning, route: AppRoute.NotFound},
  {title: ResourcesItemsTitles.Blog, route: AppRoute.NotFound},
  {title: ResourcesItemsTitles.Comunity, route: AppRoute.NotFound}
] ;

export const SupportItemsTitles = {
  FAQ: 'FAQ',
  Question: 'Задать вопрос',
} as const;

export const SUPPORT_ITEMS: NavigationItems = [
  {title: SupportItemsTitles.FAQ, route: AppRoute.NotFound},
  {title: SupportItemsTitles.Question, route: AppRoute.NotFound}
] ;

export const NavItemsTitles = {
  Catalog: 'Каталог',
  Garanty: 'Гарантии',
  Delivery: 'Доставка',
  About: 'O компании'
} as const;

export const NAV_ITEMS: NavigationItems = [
  {title: NavItemsTitles.Catalog, route: AppRoute.Main},
  {title: NavItemsTitles.Garanty, route: AppRoute.NotFound},
  {title: NavItemsTitles.Delivery, route: AppRoute.NotFound},
  {title: NavItemsTitles.About, route: AppRoute.NotFound}
] ;

export const SocialItems = {
  Vk: 'vk',
  Pinterest: 'pinterest',
  Reddit: 'reddit'
} as const;

export const FOOTER_ITEMS: FooterColumn[] = [
  {name: 'Навигация', items: NAV_ITEMS},
  {name: 'Ресурсы', items: RESOURCES_ITEMS},
  {name: 'Поддержка', items: SUPPORT_ITEMS}
];
