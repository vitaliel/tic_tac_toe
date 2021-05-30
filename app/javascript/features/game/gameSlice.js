import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {listApi, newGameApi, showApi} from "./gameApi";

const initialState = {
  current: null, // Current game
  status: 'idle',
  list: {
    loaded: false,
    loading: false,
    items: [],
  }
};

export const newGameAsync = createAsyncThunk(
  'game/newGame',
  async () => {
    const res = await newGameApi();
    // The value we return becomes the `fulfilled` action payload
    return res.data;
  }
);

export const gameListAsync = createAsyncThunk(
  'game/list',
  async () => {
    const res = await listApi();
    return res.data;
  }
);

export const gameShowAsync = createAsyncThunk(
  'game/show',
  async () => {
    const res = await showApi();
    return res.data;
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gameListAsync.pending, (state) => {
        state.list.loading = true;
        // TODO
      })
      .addCase(newGameAsync.pending, (state) => {
        // TODO
      })
      .addCase(gameShowAsync.pending, (state) => {
        // TODO
      })
  },
})

export default gameSlice.reducer;
