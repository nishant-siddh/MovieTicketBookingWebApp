import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/MovieReducer";
import axios from "axios";

const MovieContext = createContext();

const API_URL = 'https://api.tvmaze.com/search/shows?q=all';

const initialState = {
    movies: [],
    movie: null,
    isFormOpen: false,
}

const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getMoviesData = async () => {
        try {
            const res = await axios.get(API_URL);
            const movies = await res.data;
            dispatch({ type: 'GET_MOVIES_DATA', payload: movies });
        } 
        catch (error) {
            console.log('Error', error);
            dispatch({ type: 'ERROR', payload: error });
        }
    }

    const getSingleMovieData = async (id) => {
        dispatch({type: 'GET_SINGLE_MOVIE_DATA', payload: id})
    }

    const toggleForm = () => {
        dispatch({type: 'TOGGLE_FORM'})
    }

    useEffect(() => {
        getMoviesData()
    }, [])

    return (
        <MovieContext.Provider value={{...state, getMoviesData, getSingleMovieData, toggleForm}}>
            {children}
        </MovieContext.Provider>
    )
};

const useMovieContext = () => {
    return useContext(MovieContext);
}

export { MovieContext, MovieProvider, useMovieContext };