import React, { useEffect, useState } from 'react';
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
  const [favMovies, setFavMovies] = useState<ShowsAPIResponse[] | Show[]>([]);

  const [queryMovies, setQueryMovies] = useState<
    QueryShowsAPIResponse[] | Show[]
  >([]);

  const [queryAll, setQueryAll] = useState('');
  const [queryFav, setQueryFav] = useState('');

  const data: ShowsAPIResponse[] = useGetAllShows();
  const dataQuery: QueryShowsAPIResponse[] = useGetQueryShows(queryAll);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.name === 'allshows'
      ? setQueryAll(e.currentTarget.value)
      : setQueryFav(e.currentTarget.value);
  };

  const saveToLocalStorage = (items: ShowsAPIResponse[] | Show[]) => {
    localStorage.setItem('fav-movies', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie: ShowsAPIResponse | Show) => {
    const newFavouriteList = [movie, ...favMovies];
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
    isFav.length > 0 ? removeFavouriteMovie(movie) : addFavouriteMovie(movie);
  };

  useEffect(() => {
    if (localStorage.getItem('fav-movies') !== null) {
      let movieFavourites = JSON.parse(
        localStorage.getItem('fav-movies') || '',
      );
      console.log(movieFavourites);
      if (movieFavourites.length > 0) {
        console.log('if');
        setFavMovies(movieFavourites);
      }
    }

    console.log('init');
  }, []);

  useEffect(() => {
    setMovies(data);
  }, [data]);

  useEffect(() => {
    if (queryAll) {
      setQueryMovies(dataQuery);
    }
  }, [queryAll, dataQuery]);

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
