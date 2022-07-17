import { useState, useEffect } from 'react';
import { Show, ShowsAPIResponse, QueryShowsAPIResponse } from './getShows';

async function getShows<T>(url: string, query?: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

export const useGetAllShows = () => {
  const [data, setData] = useState<ShowsAPIResponse[]>([]);

  useEffect(() => {
    const fetchShows = async () => {
      const api = `https://api.tvmaze.com/shows`;
      try {
        const data = await getShows<ShowsAPIResponse[]>(api);
        setData(data);
      } catch (err) {}
    };
    fetchShows();
  }, []);
  return data;
};

export const useGetQueryShows = (query: string) => {
  const [data, setData] = useState<QueryShowsAPIResponse[]>([]);

  useEffect(() => {
    const fetchShows = async () => {
      const api = `https://api.tvmaze.com/search/shows?q=${query}`;
      try {
        const data = await getShows<QueryShowsAPIResponse[]>(api, query);
        setData(data);
      } catch (err) {}
    };
    fetchShows();
  }, [query]);

  return data;
};

export const useGetShowDetails = (id: number = 32087) => {
  const [data, setData] = useState<Show>();

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
