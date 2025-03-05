import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const WatchlistCard = ({ movie, onRemove }) => {
    const { poster_path, title, id, vote_average, original_language, release_date, overview } = movie;
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    function handleFlip() {
        if (!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500);
        }
    }

    return (
        <motion.div className="relative w-60 h-96 cursor-pointer" onClick={handleFlip}>
            <motion.div className="absolute w-full h-full rounded-lg" animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.5 }} style={{ transformStyle: "preserve-3d" }}>

                <div className="absolute w-full h-full">
                    <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} className="rounded-lg w-full h-full object-cover" />
                </div>

                <div className="absolute w-full h-full bg-gray-900 p-4 text-white flex flex-col justify-between rounded-lg transform rotate-y-180" style={{ backfaceVisibility: "hidden" }}>
                    <div>
                        <h3 className="font-bold text-lg">{title}</h3>
                        <p className="text-sm mt-2"> {overview && overview.length > 200 ? overview.slice(0, 200) + "..." : overview} </p>
                        <Link to={`/movie/${id}`} className="text-blue-400 text-sm mt-1 underline"> Read More </Link>
                        <div className="mt-4 text-sm opacity-80">
                            <div className="flex items-center gap-1 text-base text-white font-bold">
                                <p>Rating: {vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                                <i className="bx bxs-star text-white"></i>
                            </div>
                            <p className="text-base font-bold">Language: {original_language}</p>
                            <p className="text-base font-bold">Release Year: {release_date ? release_date.split('-')[0] : 'N/A'}</p>
                        </div>
                    </div>

                    <button onClick={() => { onRemove(id); }} className="bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-1 px-2 rounded-full cursor-pointer"> Remove </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default WatchlistCard;
