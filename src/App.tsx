import React, { useEffect, useState, MouseEvent } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import MainLayout from './components/MainLayout';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';

import {
  Show,
  ShowsAPIResponse,
  QueryShowsAPIResponse,
} from './utils/getShows';
import { useGetAllShows, useGetQueryShows } from './utils/use-queries';

function App() {
  const [movies, setMovies] = useState<ShowsAPIResponse[] | Show[]>([]);
  const [queryMovies, setQueryMovies] = useState<
    QueryShowsAPIResponse[] | Show[]
  >([]);

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
    // console.log(e.currentTarget.value);
    // setQueryMovies(dataQuery);
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

  useEffect(() => {
    setMovies(data);
  }, [data]);

  useEffect(() => {
    if (queryAll) {
      setQueryMovies(dataQuery);
    }
  }, [queryAll, dataQuery]);

  const [favMovies, setFavMovies] = useState<ShowsAPIResponse[] | Show[]>([]);

  const saveToLocalStorage = (items: ShowsAPIResponse[] | Show[]) => {
    localStorage.setItem('fav-movies', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie: ShowsAPIResponse | Show) => {
    const newFavouriteList = [movie, ...favMovies];
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

  return (
    <div className='App'>
      <div className='container'>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route
              index
              element={
                <MoviesList
                  movies={movies}
                  favMovies={favMovies}
                  handleFavMovie={handleFavMovie}
                  queryAll={queryAll}
                  queryFav={queryFav}
                  queryMovies={queryMovies}
                  handleOnChange={handleOnChange}
                />
              }
            />
            <Route path='favorites' element={<div>Favorites</div>} />
            <Route
              path=':id'
              element={
                <MovieDetails
                  favMovies={favMovies}
                  handleFavMovie={handleFavMovie}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
