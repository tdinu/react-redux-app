import { useState, useEffect } from 'react';
import { Movie, APIResponse } from './types';

export const useGetAllShows = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {});
  }, []);

  return data;
};

export const useGetQueryShows = (query: string) => {
  const [data, setData] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {});
  }, [query]);

  return data;
};

export const useGetShowDetails = (id: number = 32087) => {
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('id', data);
        // setData(data);
      })
      .catch((error) => {});
  }, [id]);

  return data;
};
