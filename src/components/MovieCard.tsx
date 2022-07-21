import React from 'react';
import { Link } from 'react-router-dom';
import { ShowsAPIResponse, Show } from '../utils/getShows';
import { ReactComponent as Favorite } from '../utils/favorite.svg';
import { ReactComponent as NotFavorite } from '../utils/favorite-svgrepo.svg';
import { ReactComponent as Unavailable } from '../utils/unavailable-svgrepo.svg';

interface MovieCardProps {
  movie: ShowsAPIResponse | Show;
  favMovies: ShowsAPIResponse[] | Show[];
  handleFavMovie(movie: ShowsAPIResponse | Show): void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  favMovies,
  handleFavMovie,
}) => {
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
                }}
              >
                {favMovies &&
                favMovies.length > 0 &&
                favMovies.map((fav) => fav.id).includes(movie.id) ? (
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
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default MovieCard;
