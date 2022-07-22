import React from 'react';
import { Link } from 'react-router-dom';
import { ShowsAPIResponse, Show } from '../utils/getShows';
import { ReactComponent as Favorite } from '../utils/favorite.svg';
import { ReactComponent as NotFavorite } from '../utils/favorite-svgrepo.svg';
import { ReactComponent as Unavailable } from '../utils/unavailable-svgrepo.svg';
import useToggleFavorite from '../utils/useToggleFavorite';

interface MovieCardProps {
  movie: ShowsAPIResponse | Show;
  favMovies: ShowsAPIResponse[] | Show[];
  handleFavMovie(movie: ShowsAPIResponse | Show): void;
  // toggleItemInLocalStorage(id: number): void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  favMovies,
  handleFavMovie,
  // toggleItemInLocalStorage,
}) => {
  const [favorites, toggleItemInLocalStorage] =
    useToggleFavorite('favorite-ids');

  React.useEffect(() => {
    // toggleItemInLocalStorage(1);
  }, [favorites]);

  return (
    <article className='card-container'>
      <div className='card-content'>
        <Link to={movie?.id.toString()}>
          <figure>
            {movie?.image && movie?.image?.medium ? (
              <img src={movie?.image?.medium} alt='img' />
            ) : (
              <Unavailable />
            )}
          </figure>{' '}
        </Link>

        <footer>
          <div className='card-footer'>
            <div>{movie?.name ?? '-'}</div>
            <div>
              <button
                className='fav-button'
                onClick={() => {
                  handleFavMovie(movie);
                  toggleItemInLocalStorage(movie?.id);
                }}
              >
                {favMovies &&
                favMovies.length > 0 &&
                favMovies.map((fav) => fav.id).includes(movie.id) ? (
                  <Favorite className='fav-icon' />
                ) : (
                  <NotFavorite className='fav-icon' />
                )}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default MovieCard;
