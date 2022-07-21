import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { movieApi } from '../../../services/movie';
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

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  //const response = await userAPI.fetchAll();
  //return response.data;
});

export const getAllMovies = createAsyncThunk('shows/getAllMovies', async () => {
  const api = `https://api.tvmaze.com/shows`;
  return fetch(api).then((res) => res.json());
  /* try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (err) {}
*/
  // const response = await userAPI.fetchAll();
  // const response = await fetch(`https://api.tvmaze.com/shows`);
  // const data = await response.json();
  // console.log('response', response);
  // return data;
});

const movieSlice = createSlice({
  name: 'shows',
  initialState: { shows: [], isLoading: false },
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
  },
});

// export const { actions, reducer } = movieSlice;

// Destructure and export the plain action creators
export const { fetchMovies } = movieSlice.actions;

// Define a thunk that dispatches those action creators
/* const getAllMovies = () => async (dispatch) => {
  // dispatch(usersLoading())
  const response = await moviesApi.getAllShows();
  dispatch(fetchMovies(response.data));
}; */

// export const { fetchMovies } = movieSlice.actions;
// export const getAllMovies = (state: any) => state.movies.movies;

/* export const getAllMovies = createAsyncThunk('movies/getAllMovies', async () => {
  const api = `https://api.tvmaze.com/shows`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (err) {}

  // const response = await userAPI.fetchAll();
  // const response = await fetch(`https://api.tvmaze.com/shows`);
  // const data = await response.json();
  // console.log('response', response);
  // return data;
}); */

export default movieSlice.reducer;
