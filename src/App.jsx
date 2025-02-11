import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieList from "./MovieList";
import Watchlist from "./Watchlist";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-slate-800 flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
