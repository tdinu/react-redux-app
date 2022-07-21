import React, { useEffect, useState } from 'react';
import {
  Show,
  ShowsAPIResponse,
  QueryShowsAPIResponse,
} from '../utils/getShows';
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies } from '../app/reducers/movies/movieSlice';

type MoviesListProps = {
  movies: ShowsAPIResponse[] | Show[];
  favMovies: ShowsAPIResponse[] | Show[];
  // @ts-ignore
  setFavMovies;
  handleFavMovie(movie: ShowsAPIResponse | Show): void;
  queryAll: string;
  queryFav: string;
  queryMovies: QueryShowsAPIResponse[] | Show[];
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
};

const MoviesList: React.FC<MoviesListProps> = ({
  movies,
  favMovies,
  setFavMovies,
  queryAll,
  queryFav,
  queryMovies,
  handleFavMovie,
  handleOnChange,
}) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { isLoading, shows } = useSelector((state) => state);

  // const [favMovies, setFavMovies] = useState<ShowsAPIResponse[] | Show[]>([]);

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllMovies());
  }, [dispatch]);

  useEffect(() => {
    // @ts-ignore
    // console.log('shows::', shows);
    if (localStorage.getItem('fav-movies') !== null && shows.length) {
      let movieFavourites = JSON.parse(
        localStorage.getItem('fav-movies') || '',
      );
      if (movieFavourites.length > 0) {
        setFavMovies(movieFavourites);
      }
    }
  }, [shows]);

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
              />
            </form>
          </div>
        </div>
        <div style={{ display: 'flex', width: '100%', overflowX: 'auto' }}>
          {queryAll
            ? queryMovies &&
              queryMovies.length > 0 &&
              queryMovies.map((movie: any) => {
                return (
                  <MovieCard
                    movie={movie.show}
                    favMovies={favMovies}
                    handleFavMovie={handleFavMovie}
                  />
                );
              })
            : shows &&
              shows.length > 0 &&
              shows.map((movie: ShowsAPIResponse | Show) => {
                return (
                  <MovieCard
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
                        movie={movie}
                        favMovies={favMovies}
                        handleFavMovie={handleFavMovie}
                      />
                    );
                  })
              : favMovies.map((movie: ShowsAPIResponse | Show) => {
                  return (
                    <MovieCard
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
