import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { movieApi } from '../../services/movie';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';

const initialState = {
  movies: [],
};

const initializeState = () => ({
  // ShowsAPIResponse
  id: 0,
  name: '',
  image: {
    medium: '',
    original: '',
  },
});

// const api = new Api()

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (obj, { dispatch, getState }) => {
    // dispatch(fetchAll({ limit:5 }))
    // obj = { limit:5 }
    const wholeState = getState();
    return fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=2`,
    ).then((res) => res.json());
    // .then(()=>dispatch(...));
    // .catch(()=>dispatch(...))
    //const response = await userAPI.fetchAll();
    //return response.data;
  },
);

const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId: string, thunkAPI) => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
      signal: thunkAPI.signal,
    });
    return await response.json();
  },
);

export const getAllMovies = createAsyncThunk('shows/getAllMovies', async () => {
  const api = `https://api.tvmaze.com/shows`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (err) {}
});

export const getQueryMovies = createAsyncThunk(
  'shows/getQueryMovies',
  async (obj, { dispatch, getState }) => {
    // const wholeState = getState();
    // console.log('wholeState::', wholeState);
    // @ts-ignore
    const api = `https://api.tvmaze.com/search/shows?q=${obj.query}`;
    // return fetch(api).then((res) => res.json());
    try {
      const response = await fetch(api);
      const data = await response.json();
      return data;
    } catch (err) {}
  },
);

export const getShowDetails = createAsyncThunk(
  'shows/getShowDetails',
  async (id) => {
    // `https://api.tvmaze.com/shows/`, id
    // const api = `https://api.tvmaze.com/search/shows?q=${obj.query}`;
    return fetch(`https://api.tvmaze.com/search/shows/${id}`).then((res) =>
      res.json(),
    );
  },
);

const movieSlice = createSlice({
  name: 'shows',
  initialState: { isLoading: false, shows: [], showDetails: {} },
  reducers: {
    moviesLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      /* if (state.loading === 'idle') {
        state.loading = 'pending'
      } */
    },

    fetchMovies(state, action) {
      // if (state.loading === 'pending') {
      // state.loading = 'idle'
      state.shows = action.payload;
      // }
    },
  },
  extraReducers: {
    // @ts-ignore
    [getAllMovies.pending]: (state, action) => {
      state.isLoading = true;
    },
    // @ts-ignore
    [getAllMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.shows = action.payload;
    },
    // @ts-ignore
    [getAllMovies.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // @ts-ignore
    [getQueryMovies.pending]: (state, action) => {
      state.isLoading = true;
    },
    // @ts-ignore
    [getQueryMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.shows = action.payload;
    },
    // @ts-ignore
    [getQueryMovies.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // @ts-ignore
    [getShowDetails.pending]: (state, action) => {
      state.isLoading = true;
    },
    // @ts-ignore
    [getShowDetails.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.showDetails = action.payload;
    },
    // @ts-ignore
    [getShowDetails.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// export const { actions, reducer } = movieSlice;

// Destructure and export the plain action creators
export const { fetchMovies } = movieSlice.actions;

export default movieSlice.reducer;
