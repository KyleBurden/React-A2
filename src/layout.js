import React from "react";

export function Home({movies, setMovies}) {
    function Movie( {movieName, movieDate, movieActors, moviePoster, movieRating, onRemove = f => f} ) {
        return (
          <>
            <h2>{movieName}</h2>
            <img 
                src={process.env.PUBLIC_URL + moviePoster} 
                alt={movieName + " Movie Poster"}>
            </img>
            <h3>Release Date: {movieDate}</h3>
            <h3>Actors: {(movieActors).join(", ")}</h3>
            <h3>Rating: {movieRating} Stars</h3>
            <button onClick={() => onRemove(movieName)}>Remove</button>
          </>
        );
    }
    function MovieList( { movies = [], onRemoveMovie = f => f}) {
        return (
            <>
                {movies.map( movie => (
                    <Movie key={movie.movieName} {...movie} onRemove={onRemoveMovie} />
                ))}
            </>
        );
    }

    return (
        <>
            <Header />
            <MovieList 
                movies={movies} 
                onRemoveMovie={ movieName => {
                const newMovies = movies.filter(movie => movie.movieName !== movieName);
                setMovies(newMovies);
            }} />
            <Footer/>
        </>
    );
}

function Header() {
    return (
    <>
      <header>
        <h1>KB Movie Review Website:</h1>
      </header>
    </>
    );
}

function Footer() {
    return (
        <>
        <footer>
            <p>Assignment completed by #20165611</p>
        </footer>
        </>
    );
}