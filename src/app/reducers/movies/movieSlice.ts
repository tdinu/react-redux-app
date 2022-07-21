import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

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

const movieSlice = createSlice({
  name: 'movies',
  initialState: { movies: initializeState(), isLoading: false },
  reducers: {
    fetchMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { actions, reducer } = movieSlice;

export const { fetchMovies } = movieSlice.actions;
export const getAllMovies = (state: any) => state.movies.movies;
export default movieSlice.reducer;
