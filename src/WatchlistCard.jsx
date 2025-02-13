const WatchlistCard = ({ movie, onRemove }) => {
    const { poster_path, title, id, vote_average, original_language, release_date } = movie;

    return (
        <div className="bg-blue-700 p-5 rounded-2xl shadow-inner shadow-light-100/10">
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} className="rounded-lg w-full h-90 object-cover"/>
            <div className="mt-4">
                <h3 className="text-white font-bold text-base truncate">{title}</h3>
                <div className="flex items-center space-x-2 text-gray-100 text-sm mt-2">
                    <div className="flex items-center gap-1">
                        <img src="star.svg" alt="Star Icon" className="w-4 h-4 object-contain" />
                        <p className="font-bold text-base text-white">{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>

                    <span>•</span>
                    <p className="capitalize font-medium">{original_language}</p>

                    <span>•</span>
                    <p className="font-medium">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>

            <button onClick={() => onRemove(id)} className="text-red-500 mt-3 hover:text-red-700 transition duration-300"> Remove </button>
        </div>
    );
};

export default WatchlistCard;
