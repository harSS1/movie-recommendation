import { useState } from "react"
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <header className='flex justify-between items-center text-white py-4 px-9 md:px-32 bg-indigo-950 drop-shadow-md z-50 relative'>
            <Link to="/"> <img src="/images/logo.png" alt="MovieRec Logo" className="w-40 hover:scale-110 transition-all object-contain" /> </Link>
            <ul className='hidden xl:flex items-center gap-12 font-semibold text-base'>
                <li><Link to="/" className="p-3 hover:bg-indigo-800 hover:text-white rounded-md transition-all cursor-pointer"> Home </Link></li>
                <li><Link to="/watchlist" className="p-3 hover:bg-indigo-800 hover:text-white rounded-md transition-all cursor-pointer"> Watchlist </Link></li>
            </ul>
            <div className="block xl:hidden">
                <i className="bx bx-menu text-5xl cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>

                <div className={`absolute xl:hidden top-22 left-0 w-full bg-indigo-950 flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'transform 0.5s ease, opacity 0.3s ease' }}>
                    <Link to="/" className="w-full text-center p-4 hover:bg-indigo-800 hover:text-white transition-all cursor-pointer" onClick={()=> setIsMenuOpen(false)}> Home </Link>
                    <Link to="/watchlist" className="w-full text-center p-4 hover:bg-indigo-800 hover:text-white transition-all cursor-pointer" onClick={()=> setIsMenuOpen(false)}> Watchlist </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar