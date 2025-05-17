export interface BasketItem {
  id: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  currency: string;
  averageRating?: number;
  ratingsCount?: number;
  quantity: number;
  tokenProfile: string;
}

// Интерфейс профиля корзины (для каждого пользователя по токену)
export interface BasketProfile {
  tokenProfile: string;
  books: BasketItem[];
}

// Тип состояния корзины
export interface BasketState {
  tokenActive: string;
  basket: BasketProfile[];
}