import React, { useEffect, useState, MouseEvent } from 'react';
import {
  Show,
  ShowsAPIResponse,
  QueryShowsAPIResponse,
} from '../utils/getShows';
import { useGetAllShows, useGetQueryShows } from '../utils/use-queries';
import MovieCard from './MovieCard';

type MoviesListProps = {};

const MoviesList: React.FC<MoviesListProps> = () => {
  const [movies, setMovies] = useState<ShowsAPIResponse[] | Show[]>([]);
  const [queryMovies, setQueryMovies] = useState<
    QueryShowsAPIResponse[] | Show[]
  >([]);
  const [favMovies, setFavMovies] = useState<ShowsAPIResponse[] | Show[]>([]);

  const [queryAll, setQueryAll] = useState('');
  const [queryFav, setQueryFav] = useState('');

  const dataQuery: QueryShowsAPIResponse[] = useGetQueryShows(queryAll);

  /* const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.name === 'allshows'
      ? setQueryMovies(dataQuery)
      : setQueryFav(e.currentTarget.value);
  }; */

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.name === 'allshows'
      ? setQueryAll(e.currentTarget.value)
      : setQueryFav(e.currentTarget.value);
    console.log(e.currentTarget.value);
    // setQueryMovies(dataQuery);
  };

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('submit', event);
  };

  const apiEndPoint = 'https://api.tvmaze.com'; // process.env.REACT_APP_DEMAND_API_ENDPOINT;
  // const ApiKey = 'mGrXkH5CSm1CXdp82B7SGrrBf0vW02eX';
  const data: ShowsAPIResponse[] = useGetAllShows();
  // const dataQuery: QueryShowsAPIResponse[] = useGetQueryShows('');
  // const data: QueryShowsAPIResponse[] = useGetQueryShows('girls');
  // const movie: Show = useGetShowDetails(32087);

  useEffect(() => {
    console.log('queryFav::', queryFav);
    // getMovieRequest(queryFav);
  }, [queryFav]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('fav-movies') || '',
    );
    console.log('init', movieFavourites);
    if (movieFavourites) {
      setFavMovies(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items: ShowsAPIResponse[] | Show[]) => {
    localStorage.setItem('fav-movies', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie: ShowsAPIResponse | Show) => {
    const newFavouriteList = [...favMovies, movie];
    console.log(newFavouriteList);
    setFavMovies(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie: ShowsAPIResponse | Show) => {
    const newFavouriteList = favMovies.filter(
      (favourite) => favourite.id !== movie.id,
    );

    setFavMovies(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const handleFavMovie = (movie: ShowsAPIResponse | Show) => {
    const isFav = favMovies.filter((item) => item.id === movie.id);
    console.log(isFav);
    isFav.length > 0 ? removeFavouriteMovie(movie) : addFavouriteMovie(movie);
  };

  useEffect(() => {
    setMovies(data);
  }, [data]);

  useEffect(() => {
    if (queryAll) {
      setQueryMovies(dataQuery);
    }
  }, [queryAll, dataQuery]);

  return (
    <main className='main-container'>
      <section className='shows-section'>
        <div className='section-header'>
          <h3>All Shows</h3>
          <div className='search-field'>
            <form onSubmit={onSubmit}>
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
                    handleFavMovie={handleFavMovie}
                  />
                );
              })
            : movies &&
              movies.length > 0 &&
              movies.map((movie: ShowsAPIResponse | Show) => {
                return (
                  <MovieCard movie={movie} handleFavMovie={handleFavMovie} />
                );
              })}
        </div>
      </section>

      <section className='shows-section'>
        <div className='section-header'>
          <h3>Favorite Shows</h3>
          {favMovies && favMovies.length > 0 && (
            <div className='search-field'>
              <form onSubmit={onSubmit}>
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
                <MovieCard movie={movie} handleFavMovie={handleFavMovie} />
              );
            })}
        </div>
      </section>
    </main>
  );
};

export default MoviesList;
