import {data} from '../data';
import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';

import { addMovies,setShowFavourite } from '../actions';
class App extends React.Component {
  componentDidMount(){
    const {store} = this.props;
    store.subscribe (() =>{
      console.log('STATE UPDATED');
      this.forceUpdate();
    });
    //Make api call
    //Dispatch Action
    console.log('Movies Data',addMovies(data));
    store.dispatch(addMovies(data));
    console.log('STATE',this.props.store.getState());
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourite(val));
  }

  isMovieFavourite = (movie) => {
    const {movies} = this.props.store.getState();
    const index = movies.favourites.indexOf(movie);
    if (index==-1){
      return false;
    }
    return true;
  }
  render(){
    const {movies} = this.props.store.getState();//{movies:{},search:{}}
    const {list,favourites,showFavourites} = movies
    console.log('New STATE',this.props.store.getState());
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <h1>Movie App</h1>
        <Navbar/>
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites?'':'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites?'active-tabs':''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className="list">
            {displayMovies.map((movie,index) => (
              <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.store.dispatch}
                isFavourite = {this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length===0 ? <div className="no-movies">No movies to display</div>:null}
        </div>
      </div>
    );
  }
}

export default App;
