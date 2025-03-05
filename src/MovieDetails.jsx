import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = 'https://api.themoviedb.org/3/movie';

const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    },
};

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const endpoint = `${API_BASE_URL}/${id}`;
                const response = await fetch(endpoint, API_OPTIONS);

                if (!response.ok) {
                    throw new Error("Failed to fetch movie details");
                }

                const data = await response.json();

                if (!data) {
                    setErrorMessage("Error fetching movie details");
                    return;
                }
                setMovie(data);
            } catch (error) {
                console.log(`Error fetching movie details: ${error}`);
                setErrorMessage("Error fetching movie details. Please try again.");
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (errorMessage) return <h2 className="text-red-500 text-center font-bold">{errorMessage}</h2>;
    if (movie.length == 0) return <h2 className="text-white text-center">Loading...</h2>;

    return (
        <div className="flex flex-col items-center p-6 text-white">
            <h1 className="text-4xl font-bold mb-8 text-center">{movie.title}</h1>

            <div className="flex flex-col md:flex-row gap-8 items-center">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-70 h-auto rounded-lg shadow-lg" />

                <div className="max-w-lg text-center md:text-left">
                    <p className="text-lg text-gray-300 mb-4 min-h-[80px]"> {movie.overview} </p>
                    <div className="space-y-2 text-lg font-semibold">
                        <div className="inline-flex items-center gap-1">
                            <p>Rating: {movie.vote_average.toFixed(1)} </p>
                            <i className="bx bxs-star"></i>
                        </div>
                        <p>Language: {movie.original_language.toUpperCase()}</p>
                        <p>Release Date: {movie.release_date}</p>
                        <p> Genres: {movie.genres.map((genre) => genre.name).join(", ")} </p>
                    </div>

                    <Link to="/watchlist" className="mt-6 inline-block bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-2 px-6 rounded-full cursor-pointer"> Back to Watchlist</Link>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
