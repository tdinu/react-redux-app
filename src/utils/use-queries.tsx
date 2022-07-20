import { useState, useEffect } from 'react';
import { Show, ShowsAPIResponse, QueryShowsAPIResponse } from './getShows';

async function getShows<T>(url: string, query?: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

export const useGetAllShows = (url: string) => {
  const [data, setData] = useState<ShowsAPIResponse[]>([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShows<ShowsAPIResponse[]>(url);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShows();
  }, [url]);
  return data;
};

export const useGetQueryShows = (url: string, query: string) => {
  const [data, setData] = useState<QueryShowsAPIResponse[]>([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShows<QueryShowsAPIResponse[]>(
          `${url}${query}`,
          query,
        );
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShows();
  }, [url, query]);

  return data;
};

export const useGetShowDetails = (url: string, id: string) => {
  const [data, setData] = useState<Show>();

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShow();
  }, [url, id]);

  return data;
};
