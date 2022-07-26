import React, { useEffect, useState } from 'react';
import {
  Show,
  ShowsAPIResponse,
  QueryShowsAPIResponse,
} from '../utils/getShows';
import MovieCard from './MovieCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';

import {
  getAllMovies,
  getQueryMovies,
  updateSearchQueryAllShows,
  updateSearchQueryFavShows,
} from '../store/movies/movieSlice';
import { RootState } from '../store/store';
import useLocalStorage from '../utils/useLocalStorage';

const MoviesList: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    isLoading,
    shows,
    queryShows,
    searchQueryAllShows,
    searchQueryFavShows,
  } = useAppSelector((state: RootState) => state);

  const [queryAll, setQueryAll] = useLocalStorage<string>(
    'query-all',
    searchQueryAllShows,
  );
  const [queryFav, setQueryFav] = useLocalStorage<string>(
    'query-favs',
    searchQueryFavShows,
  );

  const [movies, setMovies] = useState<ShowsAPIResponse[]>([]);
  const [queryMovies, setQueryMovies] = useState<QueryShowsAPIResponse[]>([]);
  const [favMovies, setFavMovies] = useLocalStorage<
    ShowsAPIResponse[] | Show[]
  >('fav-movies', []);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === 'allshows') {
      setQueryAll(e.target.value);
    } else {
      setQueryFav(e.currentTarget.value);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.target.name === 'allshows') {
      dispatch(updateSearchQueryAllShows);
    } else {
      dispatch(updateSearchQueryFavShows);
    }
  };

  const handleFavMovie = (movie: ShowsAPIResponse | Show) => {
    const isFav = favMovies.filter((item) => item.id === movie.id);
    const newFavouriteList =
      isFav.length > 0
        ? favMovies.filter((favourite) => favourite.id !== movie.id)
        : [movie, ...favMovies];
    setFavMovies(newFavouriteList);
  };

  useEffect(() => {
    dispatch(getAllMovies(`https://api.tvmaze.com/shows`));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getQueryMovies(`https://api.tvmaze.com/search/shows?q=${queryAll}`),
    );
  }, [queryAll, dispatch]);

  useEffect(() => {
    setMovies(shows);
  }, [shows]);

  useEffect(() => {
    setQueryMovies(queryShows);
  }, [queryShows]);

  if (isLoading) return <h2>Loading..</h2>;

  return (
    <main className='main-container'>
      <section className='shows-section'>
        <div className='section-header'>
          <h3>All Shows</h3>
          <div className='search-field'>
            <form
              onSubmit={(event: React.SyntheticEvent) => {
                event.preventDefault();
              }}
            >
              <input
                type='search'
                name='allshows'
                placeholder='Search All...'
                autoComplete='false'
                value={queryAll}
                onChange={handleOnChange}
                onKeyUp={handleKeyUp}
              />
            </form>
          </div>
        </div>
        <div className='section-content'>
          {queryAll
            ? queryMovies &&
              queryMovies.length > 0 &&
              queryMovies.map((movie: QueryShowsAPIResponse) => {
                return (
                  <MovieCard
                    key={movie?.show?.id}
                    movie={movie?.show}
                    favMovies={favMovies}
                    handleFavMovie={handleFavMovie}
                  />
                );
              })
            : movies &&
              movies.length > 0 &&
              movies.map((movie: ShowsAPIResponse | Show) => {
                return (
                  <MovieCard
                    key={movie?.id}
                    movie={movie}
                    favMovies={favMovies}
                    handleFavMovie={handleFavMovie}
                  />
                );
              })}
        </div>
      </section>

      <section className='shows-section'>
        <div className='section-header'>
          <h3>Favorite Shows</h3>
          {favMovies && favMovies.length > 0 && (
            <div className='search-field'>
              <form
                onSubmit={(event: React.SyntheticEvent) => {
                  event.preventDefault();
                }}
              >
                <input
                  type='search'
                  name='favshows'
                  placeholder='Search Favorite...'
                  value={queryFav}
                  onChange={handleOnChange}
                  onKeyUp={handleKeyUp}
                  disabled={favMovies.length <= 0}
                />
              </form>
            </div>
          )}
        </div>

        <div className='section-content'>
          {favMovies &&
            favMovies.length > 0 &&
            (queryFav
              ? favMovies
                  .filter((fav: ShowsAPIResponse | Show) =>
                    fav.name?.toLowerCase().includes(queryFav.toLowerCase()),
                  )
                  .map((movie: ShowsAPIResponse | Show) => {
                    return (
                      <MovieCard
                        key={movie?.id}
                        movie={movie}
                        favMovies={favMovies}
                        handleFavMovie={handleFavMovie}
                      />
                    );
                  })
              : favMovies.map((movie: ShowsAPIResponse | Show) => {
                  return (
                    <MovieCard
                      key={movie?.id}
                      movie={movie}
                      favMovies={favMovies}
                      handleFavMovie={handleFavMovie}
                    />
                  );
                }))}
        </div>
      </section>
    </main>
  );
};

export default MoviesList;
