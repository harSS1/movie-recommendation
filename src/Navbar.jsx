import { useState } from "react"
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <header className='flex justify-between items-center text-white py-6 px-8 md:px-32 bg-indigo-950 drop-shadow-md'>
            <Link to="/" className="w-52 hover:scale-105 transition-all"> Movie Rec </Link>
            <ul className='hidden xl:flex items-center gap-12 font-semibold text-base'>
                <li><Link to="/" className="p-3 hover:bg-indigo-800 hover:text-white rounded-md transition-all cursor-pointer"> Home </Link></li>
                <li><Link to="/movies" className="p-3 hover:bg-indigo-800 hover:text-white rounded-md transition-all cursor-pointer"> Movies </Link></li>
                <li><Link to="/watchlist" className="p-3 hover:bg-indigo-800 hover:text-white rounded-md transition-all cursor-pointer"> Watchlist </Link></li>
            </ul>
            <div className="block xl:hidden">
                <i className="bx bx-menu text-5xl cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>

                <div className={`absolute xl:hidden top-24 left-0 w-full bg-indigo-950 flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}>
                    <Link to="/" className="w-full text-center p-4 hover:bg-indigo-800 hover:text-white transition-all cursor-pointer"> Home </Link>
                    <Link to="/movies" className="w-full text-center p-4 hover:bg-indigo-800 hover:text-white transition-all cursor-pointer"> Movies </Link>
                    <Link to="/watchlist" className="w-full text-center p-4 hover:bg-indigo-800 hover:text-white transition-all cursor-pointer"> Watchlist </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar