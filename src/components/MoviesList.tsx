import React, { useEffect, useState } from 'react';
import { Movie, APIResponse } from '../utils/types';
import { useGetAllShows, useGetShowDetails } from '../utils/use-queries';

type MoviesListProps = {};

const MoviesList: React.FC<MoviesListProps> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  // requestBody = { Account: answers, theme: projectTheme };
  const apiEndPoint = 'https://api.tvmaze.com'; // process.env.REACT_APP_DEMAND_API_ENDPOINT;
  // const ApiKey = 'mGrXkH5CSm1CXdp82B7SGrrBf0vW02eX';
  const data: Movie[] = useGetAllShows();
  //   const data: Movie[] = useGetQueryShows('girls');
  const movie: any = useGetShowDetails(32087);

  useEffect(() => {
    setMovies(data);
    console.log('movie', movie);
  }, [data]);

  return (
    <div className='main-container'>
      {movies &&
        movies.length > 0 &&
        movies.map((movie: Movie) => {
          let imgUrl = movie?.image?.medium;
          return (
            <div key={movie?.id}>
              <img src={imgUrl} alt='img' />
            </div>
          );
        })}
    </div>
  );
};

export default MoviesList;
