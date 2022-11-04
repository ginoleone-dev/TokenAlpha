import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { coinId: "bitcoin", coin: "bitcoin", days: 10 },
};

// Reducer
const coinSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setTokenAndDay: (state, action) => {
      state.value = action.payload;
    },
    setOnlyToken: (state, action) => {
      state.value.coin = action.payload;
    },
    setOnlyDays: (state, action) => {
      state.value.days = action.payload;
    },
  },
});

// coinSlice.actions gets the actions inside the reducers object
export const { setTokenAndDay, setOnlyToken, setOnlyDays } = coinSlice.actions;

export const store = configureStore({
  reducer: {
    tokenInfo: coinSlice.reducer,
  },
});
