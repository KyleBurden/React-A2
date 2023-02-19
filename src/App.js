import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
  fetch('./reviewedmovies.json')
    .then((response) => response.json())
    .then(setMovies)
  }, []);
  console.log(movies);


  return (
    <div className="App">
    </div>
  );
}

export default App;
