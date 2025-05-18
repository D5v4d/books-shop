import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { entitiesBooks } from "@/src/types/listBooks";

const Adapter = createEntityAdapter<entitiesBooks>();

export const fetchBooks = createAsyncThunk(
  "fetchBooks",
  async ({ categoria, startIndex }: { categoria: string; startIndex: number }) => {
    const url = `/api/googleBooks?subject=${categoria}&startIndex=${startIndex}`;
    
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status}`);
      }

      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error("Error fetching books:", error);
      return null;
    }
  }
);

const books = createSlice({
  name: "books",
  initialState: Adapter.getInitialState({
    filter: "Architecture",
  }),
  reducers: {
    filterActive: (state, action) => {
      state.filter = action.payload;
    },
    upData: (state, action) => {
      Adapter.addMany(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        if (action.meta.arg.startIndex === 0) {
          Adapter.removeAll(state);
        }
        Adapter.addMany(state, action.payload);
      })
      .addCase(fetchBooks.rejected, (_state, action) => {
        console.error("3:", action.error.message);
      });
  },
});

export const { filterActive, upData } = books.actions;
export default books.reducer;
