import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieList from "./MovieList";
import Watchlist from "./Watchlist";
import Navbar from "./Navbar";
import Footer from "./Footer";


const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
