import { useEffect, useState } from "react";
import WatchlistCard from "./WatchlistCard";
import PaginationButton from "./PaginationButton";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 8;

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("likedMovies")) || []; 
    setWatchlist(savedMovies);
  }, []);

  const handleRemove = (id) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("likedMovies", JSON.stringify(updatedWatchlist));
  };

  const totalPages =
    watchlist.length > 0 ? Math.ceil(watchlist.length / moviesPerPage) : 1;
  const paginatedMovies = watchlist.slice(
    currentPage * moviesPerPage,
    (currentPage + 1) * moviesPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl text-white font-bold mb-8">Watchlist</h1>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedMovies.map((movie) => (
            <WatchlistCard
              key={movie.id}
              movie={movie}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <h2 className="text-2xl text-white font-bold mb-6">
          No movies in watchlist
        </h2>
      )}
      {watchlist.length > 0 && totalPages > 1 && (
        <PaginationButton
          pageCount={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default Watchlist;
