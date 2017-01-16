import { h } from 'preact';
import './MovieList.css';

const MovieList = ({ handleClick, movies, search }) => {
    const filteredMovies = search
        ? movies.filter(m => m.title.toLowerCase().indexOf(search.toLowerCase()) > -1)
        : movies;
    return (
        <ul className="movie-list">
            { filteredMovies.map(m => (
                <li key={m.title} onClick={() => handleClick(m)}>
                    <img src={m.image} role="presentation" />
                </li>
              ))
            }
        </ul>
    );
}

export default MovieList;
