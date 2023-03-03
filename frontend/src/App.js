//Project completed by Kyle burden
//20165611

import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Home, LeaveReview } from "./layout";

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
  fetch('/api/movies')
    .then((response) => response.json())
    .then(setMovies)
  }, []);
  console.log(movies);


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home movies={movies} setMovies={setMovies} />} />
        <Route path="leavereview" element={<LeaveReview movies={movies} setMovies={setMovies} />} />
        </Routes>
    </div>
  );
}

export default App;
