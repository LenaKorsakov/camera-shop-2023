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

export const RESOURCES_ITEMS: NavigationItems = [
  {title: 'Курсы операторов', route: AppRoute.NotFound},
  {title: 'Блог', route: AppRoute.NotFound},
  {title: 'Сообщество', route: AppRoute.NotFound}
] ;

export const SUPPORT_ITEMS: NavigationItems = [
  {title: 'FAQ', route: AppRoute.NotFound},
  {title: 'Задать вопрос', route: AppRoute.NotFound}
] ;

export const NAV_ITEMS: NavigationItems = [
  {title: 'Каталог', route: AppRoute.Main},
  {title: 'Гарантии', route: AppRoute.NotFound},
  {title: 'Доставка', route: AppRoute.NotFound},
  {title: 'О компании', route: AppRoute.NotFound}
] ;

export const SOCIAL_ITEMS = [
  {title: 'Переход на страницу вконтакте', icon: '#icon-vk', link: AppRoute.NotFound},
  {title: 'Переход на страницу pinterest', icon: '#icon-pinterest', link: AppRoute.NotFound},
  {title: 'Переход на страницу reddit', icon: '#icon-reddit', link: AppRoute.NotFound}
] ;

export const FOOTER_ITEMS: FooterColumn[] = [
  {name: 'Навигация', items: NAV_ITEMS},
  {name: 'Ресурсы', items: RESOURCES_ITEMS},
  {name: 'Поддержка', items: SUPPORT_ITEMS}
];
