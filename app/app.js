var React = require('react');
var ReactDOM = require('react-dom');
var {Router, Route, IndexRoute, hashHistory} = require('react-router');

var redux = require('redux');
var {Provider} = require('react-redux');

var username = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.username;
    case 'LOG_OUT':
      return null;
    default:
      return state;
  }
}

var notification = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.txt;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
}

var reducer = redux.combineReducers ({username, notification});
var store = redux.createStore(reducer);

var HomePage = require('HomePage');
var Nav = require('Nav');
var Account = require('Account');
var Transaction = require('Transaction');
var Main = require('Main');

var requireLogin = (nextState, replace, next) => {
  if(store.getState().username === null){
    replace('/'); 
  }
  next();
}

require('style!css!foundation-sites/dist/css/foundation.min.css');
$(document).ready(() => $(document).foundation());

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Router path="/" component={Main}>
        <IndexRoute component={HomePage}/>
        <Route path="account" component={Account}/>
        <Route path="transaction" component={Transaction} onEnter={requireLogin}/>
      </Router>
    </Router>
  </Provider>,
  document.getElementById('root')
);
