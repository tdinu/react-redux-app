import React, { useEffect, useState, MouseEvent } from 'react';
import {
  Show,
  ShowsAPIResponse,
  QueryShowsAPIResponse,
} from '../utils/getShows';
import { useGetAllShows, useGetQueryShows } from '../utils/use-queries';
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
  handleFavMovie,
  queryAll,
  queryFav,
  queryMovies,
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
              {/*<button type='submit' name='allshows' onClick={handleSearch}>
                Search
            </button>*/}
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
                {/*<button
                type='submit'
                name='favshows'
                disabled={favMovies.length <= 0}
                onClick={handleSearch}
              >
                Search
            </button>*/}
              </form>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', width: '100%', overflowX: 'auto' }}>
          {favMovies &&
            favMovies.length > 0 &&
            favMovies.map((movie: ShowsAPIResponse | Show) => {
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
    </main>
  );
};

export default MoviesList;
