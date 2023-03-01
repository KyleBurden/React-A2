//test
import React from "react";

import {Link} from "react-router-dom";

import { useRef } from 'react';
import {Navbar, Nav } from 'react-bootstrap';

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
export function LeaveReview({movies, setMovies}) {
    function LeaveReviewForm({onNewMovie = f => f}) {
        const movieNameText = useRef();
        const movieDateText = useRef();
        const movieActorsText = useRef();
        let [poster, setPoster] = useState("");
        const movieRatingText = useRef();
    
        const submit = e => {
            e.preventDefault();
            const movieName = movieNameText.current.value;
            const movieDate = movieDateText.current.value;
            const movieActors = movieActorsText.current.value;
            const movieRating = movieRatingText.current.value;
            const moviePoster = "/images/default.jpg"
    
            onNewMovie(movieName, movieDate, movieActors.split(", "), moviePoster, movieRating);
            movieNameText.current.value = "";
            movieDateText.current.value = "";
            movieActorsText.current.value = [];
            movieRatingText.current.value = 0;
        }

        return (
            <>
                <form onSubmit={submit}>
                    <div>
                        <label>Movie Title:<input ref={movieNameText} type="text" required /></label>
                    </div>
                    <div>
                        <label>ReleaseDate:<input ref={movieDateText} type="text" required /></label>
                    </div>
                    <div>
                        <label>Lead Cast:<input ref={movieActorsText} type="text" required /></label>
                    </div>
                    <div>
                    </div>
                    <div>
                    <label>Movie Rating:<input ref={movieRatingText} type="text" required/></label>
                    </div>
                    <div>
                        <input type="submit" value="Submit"></input>
                    </div>
                </form>
            </>
        );
    }

    return (
        <>
            <h1>Add A Review</h1>
            <nav>
            <Link to="/">Home</Link>
            </nav>
            <br></br>
            <LeaveReviewForm onNewMovie={(movieName, movieDate, movieActors, moviePoster, movieRating) => {
                const newMovies= [...movies, {movieName, movieDate, movieActors, moviePoster, movieRating}];
                setMovies(newMovies)
            }}
            />
        </>
    );
}

function Header() {
    return (
    <>
      <header>
        <h1>KB Movie Reviews</h1>
        <div>
        <Navbar bg="dark" variant="dark"> 
            <Nav>
            <Nav.Link href="/"> Home</Nav.Link>
            <Nav.Link href="/leavereview"> Leave a review </Nav.Link>
            </Nav>
        
        </Navbar>
        </div>
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