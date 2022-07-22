import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShowsAPIResponse, Show } from '../utils/getShows';
import { useGetShowDetails } from '../utils/use-queries';
import { ReactComponent as Favorite } from '../utils/favorite.svg';
import { ReactComponent as NotFavorite } from '../utils/favorite-svgrepo.svg';
import { ReactComponent as Unavailable } from '../utils/unavailable-svgrepo.svg';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getShowDetails } from '../store/movies/movieSlice';
import { RootState } from '../store/store';

type QueryParams = {
  id: string;
};

interface MovieDetailsProps {
  favMovies: ShowsAPIResponse[] | Show[];
  handleFavMovie(movie: ShowsAPIResponse | Show): void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ handleFavMovie }) => {
  let { id } = useParams<QueryParams>() as any;

  const [movie, setMovie] = useState<Show>();

  const dispatch = useAppDispatch();

  const { isLoading, showDetails } = useAppSelector(
    (state: RootState) => state,
  );

  const [favMovies, setFavMovies] = useState<ShowsAPIResponse[] | Show[]>([]);

  useEffect(() => {
    id && dispatch(getShowDetails(id));
  }, [id, dispatch]);

  useEffect(() => {
    setMovie(showDetails as Show);
  }, [showDetails]);

  if (isLoading) return <h2>Loading..</h2>;

  return (
    <main className='main-container'>
      <section className='section-image'>
        <figure>
          {movie?.image && movie?.image?.original ? (
            <img src={movie?.image?.original} alt='img' />
          ) : (
            <Unavailable />
          )}
        </figure>
      </section>
      <section className='section-details'>
        <div className='section-details--content'>
          <ul>
            {movie?.name && (
              <li>
                <button
                  className='fav-button'
                  onClick={() => {
                    handleFavMovie(movie);
                  }}
                >
                  {favMovies.map((fav) => fav.id).includes(movie.id) ? (
                    <Favorite
                      style={{
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                      }}
                    />
                  ) : (
                    <NotFavorite
                      style={{
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                      }}
                    />
                  )}
                </button>
                <h2>{movie?.name}</h2>
              </li>
            )}
            {movie?.language && (
              <li>
                <b>Language: </b>
                {movie?.language}
              </li>
            )}
            {movie?.genres && (
              <li>
                <b>Genres: </b>
                {movie?.genres?.join(', ')}
              </li>
            )}
            {movie?.status && (
              <li>
                <b>Status: </b>
                {movie?.status}
              </li>
            )}
            {movie?.network?.name && (
              <li>
                <b>Network: </b>
                {movie?.network?.name}
              </li>
            )}
            {movie?.webChannel?.name && (
              <li>
                <b>Channel: </b>
                {movie?.webChannel?.name}
              </li>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;
