import { BasketItem, BasketState } from "@/src/types/basket";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// Адаптер для работы с entity
const basketAdapter = createEntityAdapter<BasketItem>();

// Слайс корзины
const basket = createSlice({
  name: "basket",
  initialState: basketAdapter.getInitialState<BasketState>({
    tokenActive: "",
    basket: [
      {
        tokenProfile: "",
        books: [],
      },
    ],
  }),
  reducers: {
    upToken: (state, action) => {
      state.tokenActive = action.payload;
      const a = state.basket.find(
        (item) => item.tokenProfile === action.payload
      );
      if (a) {
        basketAdapter.setAll(state, a.books);
      } else {
        state.basket.push({
          tokenProfile: action.payload,
          books: [],
        });
      }
    },

    addToBasket: (state, action) => {
      state.basket.forEach((element) => {
        if (element.tokenProfile === state.tokenActive) {
          element.books.push(action.payload);
        }
      });
    },
    deleteBook: (state, action) => {
      state.basket.forEach((element) => {
        if (element.tokenProfile === state.tokenActive) {
          element.books = element.books.filter(
            (book) => book.id !== action.payload.id
          );
        }
      });
    },

    upQuantity: (state, action) => {
      const { id, changeType } = action.payload;
      state.basket.forEach((element) => {
        if (element.tokenProfile === state.tokenActive) {
          element.books = element.books.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity:
                  changeType === "plus"
                    ? item.quantity + 1
                    : Math.max(0, item.quantity - 1),
              };
            }
            return item;
          });
        }
      });
    },
  },
});

export const { addToBasket, deleteBook, upQuantity, upToken } = basket.actions;
export default basket.reducer;
