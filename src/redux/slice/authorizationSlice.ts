import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { AuthState } from "@/src/types/authorization";

const usersAdapter = createEntityAdapter();

const authorizationSlice = createSlice({
  name: "authorization",
  initialState: usersAdapter.getInitialState<AuthState>({
    active: false,
    tokenProfile: "",
    tokens: [],
  }),
  reducers: {
    upActiveLogin: (state) => {
      state.active = !state.active;
    },
    tokensActive: (state, action) => {
      state.tokenProfile = action.payload;
    },
    uptokens: (state, action) => {
      const index = state.tokens.findIndex(
        (token) => token.token === state.tokenProfile
      );

      // Если нашли совпадение — обновляем name и email
      if (index !== -1) {
        state.tokens[index].name = action.payload.name;
        state.tokens[index].email = action.payload.email;
      }
    },
    profileExit: (state) => {
      state.tokenProfile = "";
    },

    addToken: (state, action) => {
      const { email, password, token, expiresAt } = action.payload;
      state.tokens.push({ email, password, token, expiresAt, name: "Name" });
      state.tokenProfile = token;
    },
  },
});

export const { upActiveLogin, addToken, tokensActive, profileExit, uptokens } = authorizationSlice.actions;
export default authorizationSlice.reducer;
