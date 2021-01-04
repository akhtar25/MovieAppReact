import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';


// const logger = ({dispatch,getstate}) => (next) => (action) => {
  
//       next(action);
    
// }

// const thunks = ({dispatch,getstate}) => (next) => (action) => {
  
//       if(typeof action === 'function'){
//         action(dispatch);
//         return;
//       }
//       next(action);
   
// }

const store = createStore(rootReducer,applyMiddleware(thunk));
console.log('store',store);
// console.log('BEFORE STATE',store.getState());

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies: [{name:'Avengers'}]
// });

// console.log('AFTER STATE',store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);

