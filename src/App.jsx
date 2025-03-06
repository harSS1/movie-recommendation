import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieList from "./components/MovieList";
import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
