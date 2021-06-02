import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {listApi, newGameApi, showApi} from "./gameApi";

const initialState = {
  current: {id: 0, loaded: false, loading: false}, // Current game
  status: 'idle',
  list: {
    loaded: false,
    loading: false,
    error: '',
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
        state.list.error = '';
      })
      .addCase(gameListAsync.fulfilled, (state, action) => {
        state.list.loaded = true;
        state.list.loading = false;
        const {status} = action.payload;

        if (status === 'success') {
          state.list.items = action.payload.data
        } else {
          state.list.error = action.payload.message
        }
      })
      .addCase(newGameAsync.pending, (state) => {
      })
      .addCase(newGameAsync.fulfilled, (state, action) => {
        const {status} = action.payload;

        if (status === 'success') {
          state.list.items = [action.payload.data].concat(state.list.items);
        } else {
          state.list.error = action.payload.message;
        }
      })
      .addCase(gameShowAsync.pending, (state) => {
        // TODO
      })
  },
})

export const isCurrentLoaded = (state) => state.game.current.id > 0;
export const currentGame = (state) => state.game.current;

export const isListLoaded = (state) => state.game.list.loaded;
export const isListLoading = (state) => state.game.list.loading;

export const gameList = (state) => state.game.list;

export default gameSlice.reducer;
