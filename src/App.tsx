import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import MainLayout from './components/MainLayout';
const MoviesList = lazy(() => import('./components/MoviesList'));
const MovieDetails = lazy(() => import('./components/MovieDetails'));

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<MoviesList />} />
            <Route path=':id' element={<MovieDetails />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
