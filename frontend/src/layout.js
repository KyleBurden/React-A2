//test

//Project completed by Kyle burden
//20165611
import React from "react";

import { Navigate } from "react-router-dom";

import { useState} from 'react';

import {Link} from "react-router-dom";

import { useRef } from 'react';
import {Navbar, Nav } from 'react-bootstrap';

export function Home({movies, setMovies}) {

    function Movie( {name, date, actors, poster, rating, onRemove = f => f} ) {

        const actorsList = actors.map( (actor, i) => {
            if (i + 1 === actors.length){
                return <span key={i}>{actor}</span>
            } else {
                return <span key={i}>{actor}, </span>
            }
        });

        return (
          <>
                    <h3 className="">  {name}</h3>
                    <img 
                    className="border" 
                    rounded 
                    src={poster} alt={name + " Movie Poster"}>
                    </img>

                    <div>
                        <p>Release Date</p>
                        <p>{date}</p>
                        <p> Lead Actors</p>
                        <p>{actorsList}</p>
                        <p> Rating</p>
                        <p>{rating} out of 5</p>
                    </div>
                
                <button onClick={ evt => onRemove(name)}></button>
                
          </>
        );
    };
    function MovieList( { movies = [], onRemoveMovie = f => f}) {
        if (!movies.length) return <div>No movies available.</div>;
        return (
            <>
                {movies.map( movie => (
                    <Movie key={movie.name} {...movie} onRemove={onRemoveMovie} />
                ))}
            </>
        );
    };

    return (
        <>
            <Header />
            <div>
            <MovieList
                        movies={movies} 
                        onRemoveMovie={ 
                            name => {
                            const removeMovie = async () => {
                                const movieRemoved = await fetch("/api/removeMovie", 
                                    {method: "post", 
                                    body: JSON.stringify({name: name}),
                                    headers: {"Content-Type": "application/json"}
                                    });
                                const body = await movieRemoved.json();
                                if (body.message !== "Unable to delete movie") {
                                    const newMovies = movies.filter(movie => movie.name !== name);
                                    setMovies(newMovies);
                                }
                            }
                            removeMovie();
                        }
                    } />
                </div>
            <footer/>
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

            const formData = new FormData();

            formData.append("name", movieNameText);
            formData.append("date", movieDateText);
            formData.append("actors", [movieActorsText.split(",")])
            formData.append("poster", poster);
            formData.append("rating", movieRatingText);

            onNewMovie(formData);
            
    
            movieNameText.current.value = "";
            movieDateText.current.value = "";
            movieActorsText.current.value = [];
            setPoster("");
            movieRatingText.current.value = "";

            Navigate('/', { replace: true});
        }

        return (
            <>
                <form onSubmit={submit} method="post" action="/upload_files" encType="multipart/form-data">
                            <div>
                                <label className="form-label h4">Movie Poster:<input className="form-control" type="file" accept=".png,.jfif,.jpg,.jpeg"
                                onChange = {e => setPoster(e.target.files[0])} required /></label>
                            </div>
                            <div>
                                <label className="form-label h4">Movie Title:<input className="form-control" ref={movieNameText} type="text" required /></label>
                            </div>
                            <div>
                                <label className="form-label h4">Release Date:<input className="form-control" ref={movieDateText} type="text" required /></label>
                            </div>
                            <div>
                                <label className="form-label h4">Lead Cast:<input className="form-control" ref={movieActorsText} type="text" required /></label>
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
            <LeaveReviewForm onNewMovie={async (formData) => {
                const addMovie = async () => {
                const movieAdded = await fetch("/api/addMovie", {
                    method: "post",
                    body: formData
                    
                });
                const body = await movieAdded.json();
                    if (body.message === "Success") {
                        setMovies(body.movies)
                    }
                }
                    
                addMovie();
            }}
            />
            <Footer/>
        </>
    );
}

function Header() {
    return (
    <>
      <header>
        <h1>KB Movie Review Website:</h1>
        <nav>
            <Link to="LeaveReview">Click here to leave a new review</Link>
        </nav>
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