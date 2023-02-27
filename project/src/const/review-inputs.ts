
type ReviewInput = {
  name: string;
  title: string;
  placeholder: string;
  errorText: string;
}

export enum InputName {
  Name = 'userName',
  Advantage = 'advantage',
  Disadvantage = 'disadvantage',
  Review = 'review',
  Rating = 'rating',
}

export enum InputTitle {
  Name = 'Ваше имя',
  Advantage = 'Достоинства',
  Disadvantage ='Недостатки',
  Review = 'Комментарий',
  Rating = 'Рейтинг'
}

export enum InputPlaceholder {
  Name = 'Введите ваше имя',
  Advantage = 'Основные преимущества товара',
  Disadvantage = 'Главные недостатки товара',
  Review = 'Поделитесь своим опытом покупки',
}

export enum InputErrorText {
  Name = 'Нужно указать имя',
  Advantage = 'Нужно указать достоинства',
  Disadvantage = 'Нужно указать недостатки',
  Review= 'Нужно добавить комментарий.',
  ReviewLength = 'Введите больше 5 символов.',
  Rate = 'Нужно оценить товар.',
}

export const REVIEW_INPUTS: ReviewInput[] = [
  {name: InputName.Name, title: InputTitle.Name, placeholder: InputPlaceholder.Name, errorText: InputErrorText.Name},
  {name: InputName.Advantage, title: InputTitle.Name, placeholder: InputPlaceholder.Advantage, errorText: InputErrorText.Advantage},
  {name: InputName.Disadvantage, title: InputTitle.Disadvantage, placeholder: InputPlaceholder.Disadvantage, errorText: InputErrorText.Disadvantage}
];

export const REVIEW_MIN_LENGTH = 5;
