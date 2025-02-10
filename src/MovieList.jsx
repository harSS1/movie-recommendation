import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

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
    }
    setMovies((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));
  }

  return (
    <div className="grid place-items-center">
      <h1> Movie Card </h1>
      <h2> {errorMessage} </h2>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSwipe={handleSwipe} />
        ))
      ) : (
        <p> No more movies to show</p>
      )}
    </div>
  );
};

export default MovieList;
