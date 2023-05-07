const MovieRedcer = (state, action) => {
    switch (action.type) {
        case 'GET_MOVIES_DATA':
            return {
                ...state,
                movies: action.payload
            }
            
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            }

        case 'GET_SINGLE_MOVIE_DATA':
            const tempMovieDetail = state.movies.find((movie) => (movie.show.id === Number(action.payload)));
            // console.log(tempMovieDetail.show, 'tempMovieDetail');

            return {
                ...state,
                movie: tempMovieDetail.show
            }

        case 'TOGGLE_FORM':
            return {
                ...state,
                isFormOpen: !state.isFormOpen
            }
        
        default:
            return state;
    }
}

export default MovieRedcer;