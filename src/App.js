import { h, Component } from 'preact';
import MovieList from './MovieList';
import Movie from './Movie';
import './App.css';

class App extends Component {
  _didScroll = false;
  _fetchingMovies = false;
  constructor(props) {
      super(props);
      this.state = { movies: [], page: 0, movieUrl: '', search: '', };
      this.handleMovieClick = this.handleMovieClick.bind(this);
      this.handleBackClick = this.handleBackClick.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        this.fetchMovies(this.state.page + 1);

        setInterval(() => {
            if(this._didScroll) {
                this._didScroll = false;

                // when we have movieUrl we're playing a movie
                const { movieUrl } = this.state;

                if (!movieUrl && !this._fetchingMovies && (document.body.scrollHeight - (window.innerHeight + window.scrollY)) < 1000) {
                    this.fetchMovies(this.state.page + 1);
                }
            }
        }, 100);
  }

  fetchMovies(page) {
      this._fetchingMovies = true;
      fetch(`/movies?page=${page}`)
        .then(resp => resp.json())
        .then(resp => {
            this.setState({
                movies: this.state.movies.concat(resp.movies),
                page: this.state.page + 1,
            });
            this._fetchingMovies = false;
        });
  }

  handleScroll(e) {
      this._didScroll = true;
  }

  handleMovieClick(movie) {
      fetch(`/torrent-stream?magnet=${movie.magnet}`)
          .then(resp => resp.json())
          .then(resp => {
              // const movieUrl = resp.address.replace('http://localhost', `https://${window.location.hostname}`);
              this.setState({ movieUrl: resp.address });
          });
  }

  handleBackClick() {
      this.setState({ movieUrl: '' });
  }

  handleSearch(e) {
      this.setState({ search: e.target.value });
  }

  render({ }, { text }) {
    const { movies, movieUrl, search } = this.state;
    const appStyle = movieUrl ? { marginTop: 0 } : null;
    const headerStyle = movieUrl ? { display: 'none' } : null;
    return (
      <div className="App" style={appStyle}>
        <div className="header" style={headerStyle}>
            <span className="logo">At the Drive-In</span>
            <i className="fa fa-film" aria-hidden="true"></i>
            <div className="input-container">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" className="form-control" placeholder="Search" onInput={this.linkState('search')} />
            </div>
        </div>
        { movieUrl
            ? <Movie movieUrl={movieUrl} handleClick={this.handleBackClick} />
            : <MovieList movies={movies} handleClick={this.handleMovieClick} search={search} />
        }
      </div>
    );
  }
}

export default App;
