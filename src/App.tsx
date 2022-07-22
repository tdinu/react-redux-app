import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import MainLayout from './components/MainLayout';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';

import { Show, ShowsAPIResponse } from './utils/getShows';

import useLocalStorage from './utils/useLocalStorage';

function App() {
  const [favMovies, setFavMovies] = useLocalStorage<
    ShowsAPIResponse[] | Show[]
  >('fav-movies', []);

  const handleFavMovie = (movie: ShowsAPIResponse | Show) => {
    const isFav = favMovies.filter((item) => item.id === movie.id);
    const newFavouriteList =
      isFav.length > 0
        ? favMovies.filter((favourite) => favourite.id !== movie.id)
        : [movie, ...favMovies];
    setFavMovies(newFavouriteList);
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
                  favMovies={favMovies}
                  setFavMovies={setFavMovies}
                  handleFavMovie={handleFavMovie}
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
