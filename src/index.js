import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'

import reducers from './reducer'
import './axiosConfig'

const store = createStore(reducers,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
    
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();

