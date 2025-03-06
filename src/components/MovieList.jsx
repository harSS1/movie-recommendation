import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";

const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    const storedLikedMovies =
      JSON.parse(localStorage.getItem("likedMovies")) || [];
    setLikedMovies(storedLikedMovies);
    fetchMovies(storedLikedMovies);
  }, []);

  const fetchMovies = async (likedMovies) => {
    try {
      const randomPage = Math.floor(Math.random() * 10) + 1;
      const endpoint = `${API_BASE_URL}?include_adult=false&include_video=false&page=${randomPage}&sort_by=popularity.desc,vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (!data.results) {
        setErrorMessage("Error fetching movies");
        return;
      }

      const filteredMovies = data.results.filter((movie) => {
        return (
          !likedMovies.some((likedMovie) => likedMovie.id === movie.id) &&
          !movie.adult
        );
      });

      setMovies(filteredMovies);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    }
  };

  const handleSwipe = (movie, direction) => {
    if (direction === "right") {
      const updatedLikedMovies = [...likedMovies, movie];
      setLikedMovies(updatedLikedMovies);
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
      console.log(
        "Liked Movies:",
        updatedLikedMovies.map((m) => m.title)
      );
    }
    setMovies((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));
  };

  if (errorMessage)
    return (
      <h2 className="text-red-500 text-center font-bold">{errorMessage}</h2>
    );

  return (
    <div className="flex flex-col items-center w-full max-w-full p-2">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-2 text-center whitespace-normal">
        Movie Recommendations{" "}
      </h1>
      <h2 className="text-base sm:text-lg md:text-xl text-white mb-6 font-semibold text-center whitespace-normal">
        Love it? Swipe right! Not a fan? Swipe left!
      </h2>

      <div className="grid place-items-center">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSwipe={handleSwipe} />
          ))
        ) : (
          <h2 className="text-2xl text-white font-bold mb-6">
            No more movies to show
          </h2>
        )}
      </div>
      <Link
        to="/watchlist"
        className="bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-4 rounded-full mt-8"
      >
        Go to Watchlist
      </Link>
    </div>
  );
};

export default MovieList;
