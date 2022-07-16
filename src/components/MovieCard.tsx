import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../utils/types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <article className='card-container'>
      <div key={movie?.id} className='card-content'>
        <Link to={movie?.id.toString()}>
          <figure>
            <img src={movie?.image?.medium} alt='img' />
          </figure>
          <footer>
            <div className='card-footer'>
              <div>{movie?.name}</div>
              <div>icon</div>
            </div>
          </footer>
        </Link>
      </div>
    </article>
  );
};

export default MovieCard;
