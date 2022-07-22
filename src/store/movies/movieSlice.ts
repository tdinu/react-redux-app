import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface ShowsState {
  isLoading: boolean;
  shows: [];
  queryShows: [];
  searchQueryAllShows: string;
  searchQueryFavShows: string;
  showDetails: object;
}

const initialState: ShowsState = {
  isLoading: false,
  shows: [],
  queryShows: [],
  searchQueryAllShows: '',
  searchQueryFavShows: '',
  showDetails: {},
};

export const getAllMovies = createAsyncThunk(
  'shows/getAllMovies',
  async (api: string) => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      return data;
    } catch (err) {}
  },
);

export const getQueryMovies = createAsyncThunk(
  'shows/getQueryMovies',
  async (api: string) => {
    try {
      const response = await fetch(api);

      const data = await response.json();
      return data;
    } catch (err) {}
  },
);

export const getShowDetails = createAsyncThunk(
  'shows/getShowDetails',
  async (id: string) => {
    return fetch(`https://api.tvmaze.com/shows/${id}`).then((res) =>
      res.json(),
    );
  },
);

const movieSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    updateSearchQueryAllShows(state, action: PayloadAction<string>) {
      state.searchQueryAllShows = action.payload;
    },
    updateSearchQueryFavShows(state, action: PayloadAction<string>) {
      state.searchQueryFavShows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMovies.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.shows = payload;
    });
    builder.addCase(getAllMovies.rejected, (state, action) => {
      state.isLoading = false;
    });
    /*builder.addCase(getQueryMovies.pending, (state, action) => {
      state.isLoading = true;
    });*/
    builder.addCase(getQueryMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.queryShows = payload;
    });
    builder.addCase(getQueryMovies.rejected, (state, action) => {
      state.isLoading = false;
      console.log('rejected::', action.payload);
    });
    builder.addCase(getShowDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getShowDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.showDetails = payload;
    });
    builder.addCase(getShowDetails.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { updateSearchQueryAllShows, updateSearchQueryFavShows } =
  movieSlice.actions;

export default movieSlice.reducer;
