import React, { useEffect, useState } from 'react';
import {
  Show,
  ShowsAPIResponse,
  QueryShowsAPIResponse,
} from '../utils/getShows';
import MovieCard from './MovieCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';

import { getAllMovies, getQueryMovies } from '../store/movies/movieSlice';
import { RootState } from '../store/store';
// import useToggleFavorite from '../utils/useToggleFavorite';

type MoviesListProps = {
  favMovies: ShowsAPIResponse[] | Show[];
  setFavMovies: (value: ShowsAPIResponse[] | Show[]) => void;
  handleFavMovie(movie: ShowsAPIResponse | Show): void;
};

const MoviesList: React.FC<MoviesListProps> = ({
  favMovies,
  setFavMovies,
  handleFavMovie,
}) => {
  const dispatch = useAppDispatch();

  const { isLoading, shows, queryShows } = useAppSelector(
    (state: RootState) => state,
  );

  const [queryAll, setQueryAll] = useState('');
  const [queryFav, setQueryFav] = useState('');
  const [queryMovies, setQueryMovies] = useState<QueryShowsAPIResponse[]>([]);

  /* const [favorites, toggleItemInLocalStorage] =
    useToggleFavorite('favorite-ids'); */

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === 'allshows') {
      setQueryAll(e.target.value);
    } else {
      setQueryFav(e.currentTarget.value);
    }
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
                value={queryAll} // {searchQueryAllShows} //
                onChange={handleOnChange}
              />
            </form>
          </div>
        </div>
        <div style={{ display: 'flex', width: '100%', overflowX: 'auto' }}>
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
                    // toggleItemInLocalStorage={toggleItemInLocalStorage}
                  />
                );
              })
            : shows &&
              shows.length > 0 &&
              shows.map((movie: ShowsAPIResponse | Show) => {
                return (
                  <MovieCard
                    key={movie?.id}
                    movie={movie}
                    favMovies={favMovies}
                    handleFavMovie={handleFavMovie}
                    // toggleItemInLocalStorage={toggleItemInLocalStorage}
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
                  disabled={favMovies.length <= 0}
                />
              </form>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', width: '100%', overflowX: 'auto' }}>
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
                        // toggleItemInLocalStorage={toggleItemInLocalStorage}
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
                      // toggleItemInLocalStorage={toggleItemInLocalStorage}
                    />
                  );
                }))}
        </div>
      </section>
    </main>
  );
};

export default MoviesList;
