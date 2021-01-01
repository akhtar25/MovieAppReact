import {data} from '../data';
import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';

import { addMovies } from '../actions';
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
  render(){
    const {list} = this.props.store.getState(); //{list:[],favourites:[]}
    console.log('New STATE',this.props.store.getState());
    return (
      <div className="App">
        <h1>Movie App</h1>
        <Navbar/>
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>
          <div className="list">
            {list.map((movie,index) => (
              <MovieCard movie={movie} key={`movies-${index}`}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
