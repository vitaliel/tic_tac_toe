import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {joinGameApi, listApi, makeMoveGameApi, newGameApi, showApi} from "./gameApi";

const initialState = {
  current: {id: 0, loaded: false, loading: false, object: null}, // Current game
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

export const joinGameAsync = createAsyncThunk(
  'game/joinGame',
  async (gameId) => {
    const res = await joinGameApi(gameId);
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
  async (gameId) => {
    const res = await showApi(gameId);
    return res.data;
  }
);

export const makeMoveGameAsync = createAsyncThunk(
  'game/makeMove',
  async ({id, position}) => {
    const res = await makeMoveGameApi({id, position});
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
        state.current.loading = true;
        state.current.error = '';
      })
      .addCase(gameShowAsync.fulfilled, (state, action) => {
        state.current.loaded = true;
        state.current.loading = false;
        const {status} = action.payload;

        if (status === 'success') {
          state.current.object = action.payload.data;
          state.current.id = action.payload.data.id;
        } else {
          state.current.error = action.payload.message;
        }
      })
      .addCase(joinGameAsync.pending, (state) => {
        state.current.loading = true;
        state.current.error = '';
      })
      .addCase(joinGameAsync.fulfilled, (state, action) => {
        state.current.loaded = true;
        state.current.loading = false;
        const {status} = action.payload;

        if (status === 'success') {
          state.current.object = action.payload.data;
          state.current.id = action.payload.data.id;
        } else {
          state.current.error = action.payload.message;
        }
      })
      .addCase(makeMoveGameAsync.pending, (state) => {
        state.current.loading = true;
        state.current.error = '';
      })
      .addCase(makeMoveGameAsync.fulfilled, (state, action) => {
        state.current.loaded = true;
        state.current.loading = false;
        const {status} = action.payload;

        if (status === 'success') {
          state.current.object = action.payload.data;
          state.current.id = action.payload.data.id;
        } else {
          state.current.error = action.payload.message;
        }
      })
  },
})

export const currentGame = (state) => state.game.current;
export const gameList = (state) => state.game.list;

export default gameSlice.reducer;
