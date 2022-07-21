// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ShowsAPIResponse } from '../utils/getShows';

// Define a service using a base URL and expected endpoints
export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.tvmaze.com/' }),
  endpoints: (builder) => ({
    getAllShows: builder.query({
      query: () => 'shows',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllShowsQuery } = movieApi;
