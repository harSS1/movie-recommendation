import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import {Link} from 'react-router-dom';

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [likedMovies, setLikedMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.response === "False") {
        setErrorMessage(data.Error || "Error fetching movies");
      }
      setMovies(data.results || []);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSwipe = (movie, direction) => {
    if (direction === 'right') {
      const updatedLikedMovies = [...likedMovies, movie];
      setLikedMovies(updatedLikedMovies);
      localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
      console.log('Liked Movies:', updatedLikedMovies.map(m => m.title));
    }
    setMovies((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));
  }

  return (
     //only show if error message is empty 
    <div className='flex flex-col items-center w-full px-4'>
      <h1 className='text-5xl text-white font-bold mb-2'> Movie Card </h1>
      <h2 className='text-lg text-white mb-6'>Swipe right to save a movie!</h2>

      {errorMessage && <h2 className="text-red-500">{errorMessage}</h2>}
      
      <div className="grid place-items-center">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSwipe={handleSwipe} />
          ))
        ) : (
          <h2 className='text-2xl text-white font-bold mb-6'>No more movies to show</h2>
        )}
      </div>
      <Link to="/watchlist" className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full mt-8">Go to Watchlist</Link>
    </div>
  );
};

export default MovieList;
