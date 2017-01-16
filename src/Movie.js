import { h } from 'preact';
import './Movie.css';

const Movie = ({ movieUrl, handleClick }) => (
    <div className="Movie">
       <div className="back-btn" onClick={handleClick}>
            <span className="fa fa-arrow-circle-o-left" aria-hidden="true"></span>
       </div>
       <video src={movieUrl} autoPlay controls></video>
    </div>
);

export default Movie;
