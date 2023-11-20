import { useEffect, useState } from "react";

const KEY = 'fd7f3361';

export function useMovies(query:any) {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [movies, setMovies] = useState([]);

    useEffect(function () {

        setIsLoading(true);

        async function fetchMovies() {
            try {
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
                // const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${tempQuery}`)


                if (!res.ok) {
                    throw new Error("error occured");
                }

                const data = await res.json();
                setIsLoading(false);
                setMovies(data?.Search);
            } catch (error) {
                console.log(error)
            }
        }

        fetchMovies();
    }, [query]);

    return { movies, isLoading, isError }
}