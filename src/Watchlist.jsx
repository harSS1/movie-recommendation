import { useEffect, useState } from "react";

const Watchlist = () => {

    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
        setWatchlist(savedMovies);
    }, []);

    const handleRemove = (id) => {
        const updatedWatchlist = watchlist.filter(movie => movie.id !== id);
        setWatchlist(updatedWatchlist);
        localStorage.set("likedMovies", JSON.stringify(updatedWatchlist));
    };
        
        
    return (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-white font-bold mb-4">Watchlist</h1>
          {watchlist.length > 0 ? (
            <div className="grid gap-4">
              {watchlist.map((movie) => (
                <div key={movie.id} className="flex gap-4 items-center">
                  <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} className="w-24 rounded" />
                  <div>
                    <h2 className="text-lg text-white">{movie.title}</h2>
                    <button onClick={() => handleRemove(movie.id)} className="text-red-500 mt-2"> Remove</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h2 className='text-2xl text-white font-bold mb-6'>No movies in watclist</h2> // change styling
          )}
        </div>
      );
}
export default Watchlist;