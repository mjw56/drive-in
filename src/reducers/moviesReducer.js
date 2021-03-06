import * as actions from "../actions/actions";
const reducer = (state, action) => {
  switch (action.type) {
    case actions.load_movie:
      return {
        ...state,
        movie: state.movies.find(movie => movie.title === action.movie)
      };
    case actions.update_movie_list:
      return {
        ...state,
        movies: action.movies
      };
    case actions.movie_search_query:
      return {
        ...state,
        searchQuery: action.query
      };
    default:
      return state;
  }
};

export default reducer;
