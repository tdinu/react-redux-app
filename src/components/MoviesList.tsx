import React from 'react';
import {
  Show,
  ShowsAPIResponse,
  QueryShowsAPIResponse,
} from '../utils/getShows';
import MovieCard from './MovieCard';

type MoviesListProps = {
  movies: ShowsAPIResponse[] | Show[];
  favMovies: ShowsAPIResponse[] | Show[];
  handleFavMovie(movie: ShowsAPIResponse | Show): void;
  queryAll: string;
  queryFav: string;
  queryMovies: QueryShowsAPIResponse[] | Show[];
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
};

const MoviesList: React.FC<MoviesListProps> = ({
  movies,
  favMovies,
  queryAll,
  queryFav,
  queryMovies,
  handleFavMovie,
  handleOnChange,
}) => {
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
            : movies &&
              movies.length > 0 &&
              movies.map((movie: ShowsAPIResponse | Show) => {
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
                    fav.name.toLowerCase().includes(queryFav.toLowerCase()),
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
