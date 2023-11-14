import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_API_KEY
    }'`,
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (title, page = 1) => ({
        url: `http://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&s=${title}&page=${page}`,
      }),
    }),

    getDetailMovie: builder.query({
      query: (imdbID) => ({
        url: `http://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&i=${imdbID}`,
      }),
    }),
  }),
});

export const { useGetMoviesQuery, useGetDetailMovieQuery } = moviesApi;
