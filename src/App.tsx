import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import MainLayout from './components/MainLayout';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';

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
