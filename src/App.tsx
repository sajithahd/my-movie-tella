import { spawn } from 'child_process';
import './App.css';
import { useEffect, useRef, useState } from "react";
import { useMovies } from './useMovies';


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];


const average = (arr: number[]) =>
  arr.reduce((acc, cur) => acc + cur / arr?.length, 0);

function NavBar({ children }: any) {
  return (
    <nav className="nav-bar">
      {children}
    </nav>
  )
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function NumResult({ movies }: any) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  )
}

function Search({ query, setQuery }: any) {

  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(function () {
    inputEl?.current?.focus();

  })

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

function Main({ children }: any) {
  return (
    <main className="main">
      {children}
    </main>
  )
}

function Box({ children }: any) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  )
}

function MovieList({ movies, setSelectedId }: { movies: any[], setSelectedId: any }) {

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} setSelectedId={setSelectedId} />
      ))}
    </ul>
  )
}


function Movie({ movie, setSelectedId }: any) {

  return (
    <li key={movie.imdbID} onClick={() => setSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function WatchSummary({ watched }: any) {
  const avgImdbRating = average(watched.map((movie: any) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie: any) => movie.userRating));
  const avgRuntime = average(watched.map((movie: any) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

function WathcedMovieList({ watched }: any) {
  return (
    <ul className="list">
      {watched.map((movie: any) => (
        <WatchedMovie movie={movie} />
      ))}
    </ul>
  )
}


function WatchedMovie({ movie }: any) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  )
}


const KEY = 'fd7f3361';

export default function App() {
  const [watched, setWatched] = useState([]);
  const [selectedId, setSeletedId] = useState(null);

  const [query, setQuery] = useState("");

  const tempQuery = "interstellar"

  function handleSetSeletedId(id: any) {
    setSeletedId(id);
  }
  // useEffect(function () {
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //     .then(r => r.json())
  //     .then(data => setMovies(data.Search));
  // }, [])


  const { movies, isError, isLoading } = useMovies(query)

  return (
    <>
      <NavBar >
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading ?
            <span>loading</span> :
            <MovieList movies={movies} setSelectedId={handleSetSeletedId} />
          }
        </Box>
        <Box >
          <WatchSummary watched={watched} />
          <WathcedMovieList watched={watched} />
          <SelectedMovie selectedId={selectedId} />
        </Box>
      </Main>
    </>
  );
}

function SelectedMovie({ selectedId }: any) {

  const [seletecMovieDetails, setSelectedMovieDetails] = useState<any>(null);

  useEffect(function () {
    async function SelectedMovie() {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
      // const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${tempQuery}`)

      const data = await res.json();
      console.log(data);
      setSelectedMovieDetails(data);

    }


    SelectedMovie();

  }, [selectedId])

  return (
    <div>{seletecMovieDetails?.Actors}</div>
  )
}

