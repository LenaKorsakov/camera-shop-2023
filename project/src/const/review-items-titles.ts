
type ReviewItem = {
  name: string;
  title: string;
  placeholder: string;
  errorText: string;
}

export const REVIEW_ITEM_ATRIBUTES: ReviewItem[] = [
  {name: 'userName', title: 'Ваше имя', placeholder: 'Введите ваше имя', errorText: 'Нужно указать имя'},
  {name: 'advantage', title: 'Достоинства', placeholder: 'Основные преимущества товара', errorText: 'Нужно указать достоинства'},
  {name: 'disadvantage', title: 'Недостатки', placeholder: 'Главные недостатки товара', errorText: 'Нужно указать недостатки'}
];
